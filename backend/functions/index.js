const dataToDatabase = require("./dist/dataToDatabase").default
const functions = require("firebase-functions")

exports.execute = functions.https.onRequest((req, res) => {
  dataToDatabase().then(exRes => res.send(exRes))
})
