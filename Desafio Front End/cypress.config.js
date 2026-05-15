const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild")
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Configuração do Cucumber
      await addCucumberPreprocessorPlugin(on, config)
      
      // Configuração do preprocessador
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }))
      
      return config
    },
    specPattern: "cypress/e2e/**/*.{feature,cy.js}",
    
    supportFile: "cypress/support/e2e.js",
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
})