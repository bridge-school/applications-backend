const db = require('../../db/index');

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * Returns the all cohort applications. 
 */

const applicationsController = (req, res) => {
  db.collection("cohorts")
    .get()
    .then(snapshot => {
      res.json({
        data: snapshot.docs.map(doc => {

          // Destructuring the doc data in order to only pull what
          // we want to display on the index page.
          let { cohort_name, cohort_type, cohort_slug } = doc.data();
          return {
            id: doc.id,
            cohort_name,
            cohort_type,
            cohort_slug
          }
        })

      });

    }).catch(error => {
      console.log("Error getting documents: ", error);
    });
};

module.exports = {
  applicationsController,
};
