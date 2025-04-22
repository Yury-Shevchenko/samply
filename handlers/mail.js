const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const postmark = require("postmark");
const client = new postmark.Client(process.env.MAIL_POSTMARK_CLIENT);
const email_address = process.env.MAIL_ADDRESS;
const validator = require("validator"); // For email validation

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  ); //__dirname - current directory where the file is
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  // Validate email address as a secondary check
  if (
    !options.participant?.email ||
    !validator.isEmail(options.participant.email)
  ) {
    console.warn(
      "Invalid email address in mail.send:",
      options.participant?.email || "undefined"
    );
    throw new Error(
      `Invalid email address: ${options.participant?.email || "undefined"}`
    );
  }

  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  try {
    await client.sendEmail({
      To: options.participant.email,
      From: `Samply <yury.shevchenko@uni.kn>`,
      Subject: options.subject,
      TextBody: text,
      HtmlBody: html,
    });
  } catch (err) {
    // Log specific Postmark errors
    if (err.name === "InactiveRecipientsError") {
      console.error("Postmark InactiveRecipientsError:", {
        email: options.participant.email,
        statusCode: err.statusCode,
        code: err.code,
        recipients: err.recipients,
      });
    } else {
      console.error("Postmark error sending email:", err);
    }
    throw err; // Re-throw to be caught by caller
  }
};

// send test request
exports.request = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  // postmark sending
  client.sendEmail({
    From: `Samply <yury.shevchenko@uni.kn>`,
    To: email_address,
    Subject: "New task request",
    TextBody: text,
    HtmlBody: html,
  });
};

// send question
exports.sendQuestion = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  // postmark sending
  client.sendEmail({
    From: `Samply <yury.shevchenko@uni.kn>`,
    To: email_address,
    Subject: "New question",
    TextBody: text,
    HtmlBody: html,
  });
};
