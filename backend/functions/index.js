const functions = require("firebase-functions")
const Execute = require("./dist").Execute
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.execute = functions.https.onRequest((req, res) => {
  Execute(db).then(exRes => res.send(exRes))
})
