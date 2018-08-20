import { Model, Service, SaltHashSync } from 'node-mariner'; // eslint-ignore
import { normalizeEmail } from 'validator';

import config from '../../knexfile';

const UserModel = new Model({
  table: 'user',
  config,
  sanitize: {
    username: username => username.toLowerCase().trim(),
    email: email => normalizeEmail(email),
    password: password => SaltHashSync(password)
  }
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
