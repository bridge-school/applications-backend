const db = require('../../../db/index');
const { firestore } = require('firebase-admin');

const updateApplication = (req, res) => {
  let { dateOpen, dateClosed, dateResponse } = req.body;

  // Convert the string date values into Timestamp objects.
  // Firebase will handle the rest.
  let [dateOpenTstamp, dateClosedTstamp, dateResponseTstamp] = [
    firestore.Timestamp.fromDate(new Date(dateOpen + 'T00:00:00')),
    firestore.Timestamp.fromDate(new Date(dateClosed + 'T00:00:00')),
    firestore.Timestamp.fromDate(new Date(dateResponse + 'T00:00:00')),
  ];

  const newBody = { ...req.body };
  newBody.dateOpen = dateOpenTstamp;
  newBody.dateClosed = dateClosedTstamp;
  newBody.dateResponse = dateResponseTstamp;

  db.collection('cohorts')
    .doc(req.params.applicationId)
    .set({ ...newBody })
    .then(() => {
      res.status(200).json({
        message: `Application for ${
          req.body.cohortDisplayName
        } successfully updated in the database!`,
      });
    })
    .catch(error => {
      console.log('Error updating form: ', error);
    });
};

module.exports = {
  updateApplication,
};
