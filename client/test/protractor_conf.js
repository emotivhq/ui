// An example configuration file.
exports.config = {
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['./system/e2e.spec.js'],

  // Location of selenium server
  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 3000000
  }
};
