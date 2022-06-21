import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 20000,
  requestTimeout: 10000,
  retries: {
    runMode: 1,
  },
  env: {
    apiUrl: 'https://someApiUrl/',
    username: 'someUserName',
    password: 'somePassword',
    Authorization: 'Token 00000000000000000000',
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/test-results',
    charts: true,
    reportPageTitle: 'e2e tests',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  video: false,
  watchForFileChanges: false,
  screenshotsFolder: 'cypress/test-results/screenshots',
  videosFolder: 'cypress/test-results/videos',
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://someBaseUrl/',
    specPattern: 'cypress/e2e/**/*spec.*',
    excludeSpecPattern: '**/old_tests_/*.js',
    experimentalSessionAndOrigin: true
  },
})
