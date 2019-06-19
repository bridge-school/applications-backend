const db = require('../../../db/index');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Returns a single cohort application, by ID.
 */
const singleApplication = (req, res) => {
  // Pulling the applicationId from the request parameters.
  db.collection('cohorts')
    .doc(req.params.applicationId)
    .get()
    .then(doc => {
      // Check if the application exists
      if (!doc.exists) {
        res.status(404).send({ message: 'Application not found.' });
      } else {
        // Convert the Timestamp dates to Date() objs.
        let { dateOpen, dateClosed, dateResponse } = doc.data();
        [dateOpen, dateClosed, dateResponse] = [
          dateOpen.toDate(),
          dateClosed.toDate(),
          dateResponse.toDate(),
        ];

        [dateOpen, dateClosed, dateResponse] = [
          dateOpen.toISOString().split('T')[0],
          dateClosed.toISOString().split('T')[0],
          dateResponse.toISOString().split('T')[0],
        ];

        res.json({
          data: {
            id: doc.id,
            ...doc.data(),
            dateOpen: dateOpen,
            dateClosed: dateClosed,
            dateResponse: dateResponse,
          },
        });
      }
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

module.exports = {
  singleApplication,
};
