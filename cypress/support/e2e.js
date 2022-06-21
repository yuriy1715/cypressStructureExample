// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-mochawesome-reporter/register';
// Uncomment for taking code coverage https://ruckit.atlassian.net/wiki/spaces/~882893233/pages/2554691585/Cypress+code+coverage
//import '@cypress/code-coverage/support'
require('cypress-grep')();
// Alternatively you can use CommonJS syntax:
// require('./commands')
