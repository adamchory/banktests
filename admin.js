const admin = require('firebase-admin');
const dotenv = require('dotenv').config();

//const serviceAccount = require("./bankingappadmin.json");


admin.initializeApp({

  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

module.exports = admin;