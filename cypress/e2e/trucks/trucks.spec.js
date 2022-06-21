/// <reference types="Cypress" />

import { licensePlate, licensePlateColumn, truckNumber, truckType } from './trucks.page';
import { filterButton } from '../../components/filter.dialog.component';

describe('Trucks tests', {tags: '@part1'}, () => {

  const truck = 'Tractor';

  beforeEach(function('login and create data') {
    cy.loginViaApi();
    cy.intercept('GET', `${Cypress.env().apiUrl}/api/trucks/**`).as('trucksList');
    cy.createTruck();
    cy.fixture('fleet/trucks/trucksPreferences').then((body) => {
      body.filters = [];
      cy.setUserPreferencesViaApi(body.id, body);
    });
  });

  afterEach(function('clean up data') {
    cy.deleteAllEntities('trucks');
  });

  it('should add a truck', function() {
    cy.visit('/trucks');
    cy.wait('@trucksList');
    cy.contains('No Truck').should('be.visible');
    cy.get('button').contains('Add Truck')
      .should('be.visible').click();
    cy.get('#mat-dialog-title-0').should('contain', 'Add a Truck');
    cy.get(truckType).find('.dropdown-button').eq(0)
      .should('be.visible').wait(500).click();
    cy.get('#dropdown-search').should('be.visible')
      .type(truck);
    cy.contains(truck).click();
    cy.get(truckNumber).type('12345');
    cy.get(licensePlate).type('12345');
    cy.contains('Select Markets').click();
    cy.get('#dropdown-search input').eq(2)
      .type('Test tag')
      .wait(2000);
    cy.contains('Test Tag').click();
    cy.get('button').contains(' + Add Truck ').click();
    cy.wait('@trucksList');
    getItemOnGridByName(truck).scrollIntoView().should('be.visible');
  });

  it('should search a truck', function() {
    cy.createTruck();
    cy.visit('/trucks');
    cy.wait('@trucksList');
    cy.get(tableRow).should('have.length', 2);
    getItemOnGridByIndex(0).find(licensePlateColumn).invoke('text').as('licensePlate');
    cy.then(function() {
      cy.get(searchField).type(this.licensePlate).type('{enter}');
      cy.wait('@trucksList').wait(2000);
      cy.get(tableRow).should('have.length', 1);
      cy.get(licensePlateColumn).should('contain', this.licensePlate);
    });
  });
});
