import 'cypress-wait-until';

Cypress.Commands.add('loginViaApi', (isAdminUrl = false ,username = Cypress.env('username'), password = Cypress.env('password')) => {
  let urlPath = isAdminUrl ? 'login/' : 'login/users/';
  cy.log(`login by user - ${username}, password - ${password}`)
  cy.session([username, password], () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/auth/${urlPath}`,
    body: {
      "username": username,
      "password": password,
    }
  })
    .then(({ body }) => {
      window.localStorage.setItem('currentUser', JSON.stringify(body))
      Cypress.env().Authorization = `Token ${body.token}`;
    })
  })
});

Cypress.Commands.add('createTruck', (condition = 'service', truckId = 'truckId') => {
  cy.getRandomEntityId('types', null, 'typeId')
  cy.then(function() {
    cy.request({
      method: 'POST',
      url: `${Cypress.env().apiUrl}/api/trucks/`,
      headers: { 'Authorization': `${Cypress.env().Authorization}` },
      body: {
        name: 'truck ' + Math.random().toString().slice(2, 22),
        truck_type: this.typeId,
        service_status: condition
      }
    }).then(function({ status, body }) {
      expect(status).equal(201);
      cy.wrap(body.id).as(truckId);
    })
  })
});

Cypress.Commands.add('deleteDownloadsFolder', () => {
  const downloadsFolder = Cypress.config('downloadsFolder')
  cy.task('deleteFolder', downloadsFolder)
});
