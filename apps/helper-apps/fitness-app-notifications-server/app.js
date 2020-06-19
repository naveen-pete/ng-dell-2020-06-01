const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const addPushSubscriber = require("./add-push-subscriber.route");
const sendNewsletter = require("./send-newsletter.route");

const vapidKeys = {
  "publicKey": "BKPl0gPQD_R5mj-dAZWAnJksfDO2BY5JiHb3lR4G5Ex358fNWb_AFDxIWsp2z-q7-FytoE7I-LROAdDi8PJGdB4",
  "privateKey": "jYV2dcGhMWdtejb5XEpsohz92VnfMxO03ZnjNwTKfwA"
}

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
