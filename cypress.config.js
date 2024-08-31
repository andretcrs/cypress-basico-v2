const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.js", // Verifique se este padrão está correto
  },

  viewportHeight: 880,
  viewportWidth: 1280,
  // `pluginsFile` não é necessário aqui na configuração moderna
});
