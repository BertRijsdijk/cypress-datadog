/// <reference types="cypress" />

describe('Functional monitor', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/waiting')
  })

  it('production-flow', () => {
    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()

    // wait for GET comments/1
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
  })
})
