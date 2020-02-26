/* eslint-disable new-cap */
const cmsModel = require('./cms.model');

// initial CMS
exports.init = async () => {
  console.log('initial CMS');
  const lastContent = await cmsModel.find();

  if (lastContent.length === 0) {
    const content = new cmsModel();
    await content.save();
  }
};

exports.getLandingPageContent = async () => {
  const data = await cmsModel.find();
  return data[0].home_page;
};

// exports.updateLandingPageContent = async (data = {}) => {
//   if (typeof data === 'object') {

//   } else {
//     return false;
//   }
// };

