## Samply

Samply makes sending notifications easy and provides a secure foundation for connection with your participants. The application has an open source code on GitHub and runs online at https://samply.tk. With Samply you can schedule notifications for experience sampling studies. In the current moment, only Android mobile devices are supported.

## Features

* Only Android mobile devices for participants
* Different types of notifications schedule (one-time, repeat, event-based)
* Write messages to your participants with URL links of your study
* Identify participants in your study with unique IDs in the URL query
* Preserve anonymity: participants do not need to provide any personal information such as emails or phone numbers. All notifications are send through the application.

## Screenshots


## Use in any web browser

As a researcher, you can create and manage your study in a web browser. After creating the study, you send an invitation link to participants. Participants can open the link on their Android phones, install the application and sign up for your study. Now, they can receive notifications from you. These notifications look and feel like native mobile notifications.

## Installing from Source (for developers)

Clone the repository to your local folder and run `npm install`

The application depends on the environment variables, which you can specify in the file variables.env in the root folder. Create the file variables.env and define the following parameters:

NODE_ENV
DATABASE
MAIL_USER
MAIL_PASS
MAIL_HOST
MAIL_PORT
PORT
MAP_KEY
SECRET
KEY
MAIL_POSTMARK_CLIENT
MAIL_ADDRESS
VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY

## Deploying on the server

Please contact us if you want to deploy it on your server.

## Contribute to the software

Thank you for considering to contribute to the development of Samply! You can submit an issue or a bug report via [GitHub](https://github.com/Yury-Shevchenko/samply/issues/new). If you want to contribute to the code development, submit a pull request or get in touch with us via [Samply Slack chat](https://join.slack.com/t/open-lab-online/shared_invite/enQtNDU3MzgzMzY4NDcxLTBjZTg1NmViYTEwYWI0NmE3MDZmM2QwMzNhZmRmNmZkMDRhMzhlNTZlZWU2OWU0MmU5YTBhMjU4MWFlYjcwYjA).

## Support

If you have problems with the application and seek support, please feel free to join our [Samply Slack chat](https://join.slack.com/t/open-lab-online/shared_invite/enQtNDU3MzgzMzY4NDcxLTBjZTg1NmViYTEwYWI0NmE3MDZmM2QwMzNhZmRmNmZkMDRhMzhlNTZlZWU2OWU0MmU5YTBhMjU4MWFlYjcwYjA).

## License

MIT
