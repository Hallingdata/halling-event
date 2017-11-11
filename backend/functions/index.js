const functions = require("firebase-functions")
const fireAdmin = require("firebase-admin")
const fireFunc = require("firebase-functions")

//fireAdmin.initializeApp(fireFunc.config().firebase)

var serviceAccount = require("../privateKey.json")

fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert(serviceAccount),
  databaseURL: "https://halling-event.firebaseio.com",
})

const dataToDatabase = require("./dist/dataToDatabase").default
const notify = require("./dist/notify/index").default

exports.notify = functions.https.onRequest((req, res) => {
  notify().then(exRes => res.send(exRes))
})

// exports = {
//   pullData: functions.https.onRequest((req, res) => {
//     dataToDatabase().then(exRes => res.send(exRes))
//   }),
//   notify: functions.https.onRequest((req, res) => {
//     notify().then(exRes => res.send(exRes))
//   }),
// }
