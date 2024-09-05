const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.js",
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false,
      charts: false,
      reportPageTitle: 'Relatório de Testes',
    },
    screenshotsFolder: 'cypress/screenshots', 
    screenshotOnRunFailure: true, 
    video: false, 
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    
   
  },

  viewportHeight: 880,
  viewportWidth: 1280,
});
