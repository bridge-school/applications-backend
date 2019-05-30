const testData = require('../../test-data/data.json');
const applicationsController = (req, res) => {
  return res.json(testData);
};

module.exports = {
  applicationsController,
};
