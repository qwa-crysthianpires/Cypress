const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    "viewportWidth": 1600,
    "viewportHeight": 920,
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
