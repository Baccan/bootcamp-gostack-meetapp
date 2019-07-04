import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Gustavo Baccan Gomes',
    email: 'gustavobaccang@gmail.com',
    password_hash: '123412341234',
  });

  return res.json(user);
});

export default routes;
