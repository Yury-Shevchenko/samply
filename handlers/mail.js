const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const postmark = require('postmark');
const client = new postmark.Client(process.env.MAIL_POSTMARK_CLIENT);
const email_address = process.env.MAIL_ADDRESS;

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user:  process.env.MAIL_USER,
    pass:  process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {} ) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options); //__dirname - current directory where the file is
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  //postmark sending
  client.sendEmail({
    "From": "no-reply@open-lab.online",
    "To": options.participant.email,
    "Subject": options.subject,
    "TextBody": text,
    "HtmlBody": html,
  });

};

exports.invite = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: `Open Lab <no-reply@open-lab.online>`,
    to: options.participant.email,
    subject: options.subject,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};

//send test request
exports.request = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  //postmark sending
  client.sendEmail({
    "From": "no-reply@open-lab.online",
    "To": email_address,
    "Subject": 'New task request',
    "TextBody": text,
    "HtmlBody": html,
  });
};

//send question
exports.sendQuestion = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  //mailtrap sending
  const mailOptions = {
    from: `no-reply@open-lab.online`,
    to: email_address,
    subject: 'New question',
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
