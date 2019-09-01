import Meetup from '../models/Meetup';
import User from '../models/User';

class OrganizingController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      limit: 10,
      order: [['id', 'DESC']],
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
