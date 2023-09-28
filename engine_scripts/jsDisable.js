module.exports = async (page, scenario, vp) => {
  await page.setRequestInterception(true)
  //check resourceType is script
  page.on('request', request => {
    if (request.resourceType() === 'script')
      request.abort();
    else
      request.continue();
  })
};
