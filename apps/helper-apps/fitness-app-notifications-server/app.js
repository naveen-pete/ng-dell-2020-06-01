const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const addPushSubscriber = require("./add-push-subscriber.route");
const sendNewsletter = require("./send-newsletter.route");

const vapidKeys = {
  publicKey: "BC506Dc3cB1qO-5WDIbUZG9AUiiCERMBrR_8hjQAYcoGDNDB8Dej8j4Yt0XMVXUe5IRZ7BE78UGGtyVGsBWhoB4",
  privateKey: "pIkw-QWo7toQlyrfi8BmhrFvY8HEAx4m-8A1N3Acc70"
};

webpush.setVapidDetails(
  'mailto:support@fitness-app.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// REST API
app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);

// launch an HTTP Server
const port = 3000;
app.listen(port, () => {
  console.log(`Fitness App Notifications Server running at http://localhost:${port}`);
});
