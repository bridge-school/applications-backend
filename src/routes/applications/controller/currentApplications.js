const db = require('../../../db/index');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Returns the current cohort applications only.
 */
const currentApplications = (req, res) => {
  db.collection('cohorts')
    .get()
    .then(snapshot => {
      res.json({
        // Filter out the expired, or future cohorts.
        data: snapshot.docs
          .filter(doc => {
            // Get the date values from each document
            let { dateOpen, dateClosed } = doc.data();
            let date_open_date, date_closed_date;

            [date_open_date, date_closed_date] = [
              dateOpen.toDate(),
              dateClosed.toDate(),
            ];
            let now = new Date();

            // Do a comparison to return whether the cohort is current.
            return date_open_date <= now && now < date_closed_date;
          })
          .map(doc => {
            let { cohortName, cohortType, cohortSlug } = doc.data();

            return {
              id: doc.id,
              cohortName,
              cohortType,
              cohortSlug,
            };
          }),
      }); //res
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

module.exports = {
  currentApplications,
};
