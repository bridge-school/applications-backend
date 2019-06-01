//const testData = require('../../test-data/data.json');
const db = require('../../db/index');

const applicationsController = (req, res) => {
  db.collection("cohorts")
    .get()
    .then(snapshot => {
      res.json({
        data: snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })

      });

    }).catch(error => {
      console.log("Error getting documents: ", error);
    });

  //return res.json(testData);
};

module.exports = {
  applicationsController,
};
