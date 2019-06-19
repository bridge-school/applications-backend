const db = require('../../../db/index');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Returns the all cohort applications.
 */

const allApplications = (req, res) => {
  db.collection('cohorts')
    .get()
    .then(snapshot => {
      res.json({
        data: snapshot.docs.map(doc => {
          // Destructuring the doc data in order to only pull what
          // we want to display on the index page.
          let {
            cohortName,
            cohortType,
            cohortSlug,
            dateOpen,
            dateClosed,
            dateResponse,
          } = doc.data();

          // Convert the Timestamp dates to Date() objs.
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
          return {
            id: doc.id,
            cohortName,
            cohortType,
            cohortSlug,
            dateOpen,
            dateClosed,
            dateResponse,
          };
        }),
      });
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

module.exports = {
  allApplications,
};
