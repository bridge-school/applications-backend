const db = require('../../db/index');

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * Returns a single cohort application, by ID. 
 */
const applicationsSingleController = (req, res) => {

  // Pulling the applicationId from the request parameters.
  db.collection("cohorts").doc(req.params.applicationId)
    .get()
    .then(doc => {
      // Check if the application exists
      if (!doc.exists) {
        // Just return empty data. TODO: decide with team how they want it structured.
        res.json({
          data: {}
        });
      } else {
        //let { cohort_name, cohort_type, cohort_slug } = doc.data();
        res.json({
          data: {
            id: doc.id,
            ...doc.data()
          }
        });
      }
    }).catch(error => {
      console.log("Error getting documents: ", error);
    });
};

module.exports = {
  applicationsSingleController,
};
