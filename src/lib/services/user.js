import { Model, Service, SaltHashSync } from 'node-mariner'; // eslint-disable-line
import { normalizeEmail } from 'validator';
import Events from '@/lib/events';
import config from '../../../knexfile';

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
  emit: (name, data, payload) => Events.emit(name, data, payload),
  validate: {
    create: {
      username: { presence: true, length: { minimum: 3 } },
      email: { presence: true, email: true },
      password: { presence: true, length: { minimum: 6 } }
    }
  }
});
