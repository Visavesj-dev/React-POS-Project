var OneSignal = require("onesignal-node");

const myClient = new OneSignal.Client(
  "a86626b2-8cc8-4afd-8363-693ec4e41e77", // appId
  "MzA4YWJjMDMtNTUyYi00ZGI3LWEyZDQtMWM0NTQ2ZmZlMzAz" // apiKey or restKey
);

const notification = {
  contents: {
    en: "CodeMobiles.com",
    th: "โค้ดโมบายส์ จำกัด"
  },
  included_segments: ["Subscribed Users"]
};

// or you can use promise style:
myClient
  .createNotification(notification)
  .then(response => {
    console.log(JSON.stringify(response));
  })
  .catch(e => {
    console.log(JSON.stringify(e));
  });
