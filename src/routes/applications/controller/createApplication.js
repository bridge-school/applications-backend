const db = require('../../../db/index');
const { firestore } = require('firebase-admin');

const createApplication = (req, res) => {
  let { dateOpen, dateClosed, dateResponse, cohortSlug } = req.body;

  // Convert the string date values into Timestamp objects.
  // Firebase will handle the rest.
  let [dateOpenTstamp, dateClosedTstamp, dateResponseTstamp] = [
    firestore.Timestamp.fromDate(new Date(dateOpen)),
    firestore.Timestamp.fromDate(new Date(dateClosed)),
    firestore.Timestamp.fromDate(new Date(dateResponse)),
  ];

  const newBody = { ...req.body };
  newBody.dateOpen = dateOpenTstamp;
  newBody.dateClosed = dateClosedTstamp;
  newBody.dateResponse = dateResponseTstamp;
  const cohortCollection = db.collection('cohorts');

  cohortCollection
    .where('cohortSlug', '==', cohortSlug)
    .get()
    .then(querySnapshot => {
      //console.log('applicationSlug >>> we got something!!!');
      //res.json({ slugExists: !querySnapshot.empty });
      if (querySnapshot.empty) {
        cohortCollection
          // add a new application with id generated by Firestore
          .add({ ...newBody })
          .then(docRef => {
            res.status(201).json({
              id: docRef.id,
              message: `Application for ${
                req.body.cohortName
              } successfully added to the database!`,
            });
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              message:
                'Server error, application was not added to the database.',
            });
          });
      } else {
        res.statusMessage = 'Duplicate Cohort Slug found.';
        res.status(400).end();
      }
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

module.exports = {
  createApplication,
};
