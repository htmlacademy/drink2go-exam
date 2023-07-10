module.exports = async (page, scenario, vp) => {
  await require('./interceptImages')(page, scenario);
};
