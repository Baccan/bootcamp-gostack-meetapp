import { Op } from 'sequelize';

import { isBefore, startOfHour, parseISO } from 'date-fns';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const {
      // formato YYYY-MM-DD
      // date = new Date().toISOString().split('T')[0],
      page = 1,
    } = req.query;

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      limit: 10,
      // order: [['id', 'DESC']],
      offset: (page - 1) * 10,
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date_hour: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          include: [
            {
              model: User,
              as: 'user',
              required: true,
            },
            {
              model: File,
              as: 'image',
              required: true,
            },
          ],
        },
      ],
      order: [['meetup', 'date_hour']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date_hour: meetup.date_hour,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const { userId } = req;
    const { meetupId } = req.params;
    const subs = await Subscription.findOne({
      where: {
        user_id: userId,
        meetup_id: meetupId,
      },
    });

    if (!subs) {
      return res
        .status(400)
        .json({ error: 'Meetup not found or you are not subscribe to it.' });
    }

    const hourStart = startOfHour(parseISO(subs.date_hour));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Cant unsub to past meetups.' });
    }

    subs.destroy();

    return res.json({ message: 'deleted' });
  }
}

export default new SubscriptionController();
