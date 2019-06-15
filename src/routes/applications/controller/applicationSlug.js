const db = require('../../../db/index');

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Returns JSON result of whether a slug already exists in the DB or not.
 */
const applicationSlug = (req, res) => {
  db.collection('cohorts')
    .where('cohortSlug', '==', req.params.slug)
    .get()
    .then(querySnapshot => {
      //console.log('applicationSlug >>> we got something!!!');
      res.json({ slugExists: !querySnapshot.empty });
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
};

module.exports = {
  applicationSlug,
};
