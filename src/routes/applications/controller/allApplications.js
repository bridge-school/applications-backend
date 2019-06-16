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
          let { cohortName, cohortType, cohortSlug, dateClosed } = doc.data();
          return {
            id: doc.id,
            cohortName,
            cohortType,
            cohortSlug,
            dateClosed,
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
