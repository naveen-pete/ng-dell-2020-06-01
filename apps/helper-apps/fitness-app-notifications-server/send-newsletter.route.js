const webpush = require('web-push');

const USER_SUBSCRIPTIONS = require("./in-memory-db");

function sendNewsletter(req, res) {

  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload = {
    "notification": {
      "title": "Fitness App News",
      "body": "Newsletter Available!",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "explore",
        "title": "Go to the site"
      }]
    }
  };

  Promise.all(
    USER_SUBSCRIPTIONS.map(
      sub => webpush.sendNotification(
        sub,
        JSON.stringify(notificationPayload)
      )
    )
  )
    .then(() => res.status(200).json({
      message: 'Newsletter sent successfully.'
    }))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
}

module.exports = sendNewsletter;