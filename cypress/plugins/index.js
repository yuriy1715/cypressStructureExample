// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { rmdir } = require('fs');

const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = (on, config) => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName)
      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error(err)
            return reject(err)
          }
          resolve(null)
        })
      })
    }
  });
  on('before:run', async (details) => {
    console.log('override before:run');
    await beforeRunHook(details);
  });

  on('after:run', async () => {
    console.log('override after:run');
    await afterRunHook();
  });
  require('cypress-grep/src/plugin')(config)
  //Uncomment this for taking code coverage
  //require('@cypress/code-coverage/task')(on, config);
  return config;
};
