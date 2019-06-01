const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-credentials.json');

// initialize firebase store
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const settings = { timestampsInSnapshots: true };


const db = admin.firestore();
admin.firestore().settings(settings);

// import the db from any file to access firebase!
module.exports = db;
