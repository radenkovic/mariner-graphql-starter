import { Mailer } from 'node-mariner'; // eslint-disable-line
require('dotenv').config();

// reality check
if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  console.warn(
    'SMTP settings (SMTP_HOST, SMTP_USER, SMTP_PASS) not found in environment variables, your emails may not be sent'
  );
}

const MailAgent = new Mailer({
  from: '"Dan Radenkovic" <dan@radenkovic.org>',
  transport: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465, // If TLS on port 587 doesn't work, try using port 465 and/or using SSL instead
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
});

export default MailAgent;
