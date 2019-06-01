const db = require('../../db/index');

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * Returns the current cohort applications only. 
 */
const applicationsCurrentController = (req, res) => {
  db.collection("cohorts")
    .get()
    .then(snapshot => {
      res.json({
        // Filter out the expired, or future cohorts.
        data: snapshot.docs.filter(doc => {
          // Get the date values from each document
          let { date_open, date_closed } = doc.data();
          [date_open_date, date_closed_date] = [date_open.toDate(), date_closed.toDate()];
          let now = new Date();

          // Do a comparison to return whether the cohort is current.
          return date_open_date <= now && now < date_closed_date;

        }).map(doc => {
          let { cohort_name, cohort_type, cohort_slug } = doc.data();

          return {
            id: doc.id,
            cohort_name,
            cohort_type,
            cohort_slug
          }
        })

      }); //res

    }).catch(error => {
      console.log("Error getting documents: ", error);
    });
};

module.exports = {
  applicationsCurrentController,
};
