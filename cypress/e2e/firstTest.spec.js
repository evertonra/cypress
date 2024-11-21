/// <reference types="cypress" />

describe("First test suite", () => {
  it("First test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // By Tag name - O cypress vai achar todos os elementos com tagname input
    cy.get("input");

    //By ID - O cypress vai achar o elemento com id email
    cy.get("#inputEmail1");

    //By Class value - O cypress vai achar o elemento com a classe input-email
    // adicionar o '.' para indicar que é uma classe
    cy.get(".input-full-width");

    //by atribute name - O cypress vai achar o elemento com o atributo name=email
    cy.get("[fullwidth]");

    //by atribute and value
    cy.get('[placeholder="Email"]');

    //by entire Classe value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag, attribute id and class
    cy.get('input[id="inputEmail1"]#inputEmail1.input-full-width');

    // by cypress test ID
    cy.get('[data-cy="imputEmail1"]');
  });
});
