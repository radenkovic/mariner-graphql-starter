import { Model, Service } from 'node-mariner'; // eslint-ignore
import config from '../../knexfile';

const UserModel = new Model({
  table: 'user',
  config
});

export default new Service({
  model: UserModel,
  name: 'user',
  validate: {
    create: {
      username: { presence: true },
      email: { presence: true, email: true },
      password: { presence: true }
    }
  }
});
