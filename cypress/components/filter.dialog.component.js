/// <reference types="Cypress" />

export const
  filterDialogComponent = 'trip-filter-dialog',
  modalContainer = 'mat-dialog-container',
  filterButton = '.btn-filters',
  modalTitle = '.modal-title',
  calendarCellContent = '.mat-calendar-body-cell-content';

function checkTitleFilterModal(title) {
  cy.get(modalTitle).should('have.text', title);
}

function setDate(year, month, day) {
  cy.get(calendarCellContent).contains(year).click()
  cy.get(calendarCellContent).contains(month).click()
  cy.get(calendarCellContent).contains(day).click()
}

export { checkTitleFilterModal, setDate};
