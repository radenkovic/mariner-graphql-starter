import { Events } from 'node-mariner'; // eslint-disable-line
import Mailer from '@/lib/mailer';
import fs from 'fs';
import path from 'path';

const PubSub = new Events();
const baseTemplate = fs.readFileSync(
  path.join(__dirname, '../mailer/templates/base.html'),
  'UTF-8'
);
const userTemplate = fs.readFileSync(
  path.join(__dirname, '../mailer/templates/user-create.html'),
  'UTF-8'
);

PubSub.on('user:create', async (user, params) => {
  console.log('Pubsub params', user, params);
  try {
    console.log('sending email...');
    await Mailer.send({
      to: 'dan@radenkovic.org',
      baseTemplate,
      html: userTemplate,
      subject: 'test email {{variable}}',
      variables: {
        ...user
      }
    });
    console.log('email sent');
  } catch (e) {
    console.warn('email not sent', e);
  }
});

export default PubSub;
