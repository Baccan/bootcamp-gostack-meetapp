import * as Yup from 'yup';

import {
  isBefore,
  startOfHour,
  parseISO,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .required()
        .min(5),
      description: Yup.string()
        .required()
        .min(15),
      location: Yup.string()
        .required()
        .min(10),
      date_hour: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const file = await File.findByPk(req.body.file_id);
    if (!file) {
      return res.json({ error: 'File not found' });
    }

    const hourStart = startOfHour(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: `It's impossible to create meetups on past dates` });
    }

    const user_id = req.userId;
    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().min(5),
      description: Yup.string().min(15),
      location: Yup.string().min(10),
      date_hour: Yup.date(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { userId } = req;
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== userId) {
      return res
        .status(400)
        .json({ error: 'User id is not equals to creator id' });
    }

    const hourStart = startOfHour(parseISO(meetup.date_hour));

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: `It's impossible to change finished meetups` });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async index(req, res) {
    const where = {};
    const {
      // formato YYYY-MM-DD
      // date = new Date().toISOString().split('T')[0],
      page = 1,
    } = req.query;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date_hour = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      limit: 10,
      // order: [['id', 'DESC']],
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Subscription,
          as: 'subscription',
        },
      ],
    });

    return res.json(meetups);
  }

  async indexOne(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const { userId } = req;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== userId) {
      return res
        .status(400)
        .json({ error: `It's impossible to delete meetups from other users` });
    }

    const hourStart = startOfHour(parseISO(meetup.date_hour));

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: `It's impossible to delete finished meetups` });
    }

    meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
