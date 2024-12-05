/// <reference types="cypress" />

describe("First test suite", () => {
  // it("First test", () => {
  //   cy.visit("/");
  //   cy.contains("Forms").click();
  //   cy.contains("Form Layouts").click();

  //   // By Tag name - O cypress vai achar todos os elementos com tagname input
  //   cy.get("input");

  //   //By ID - O cypress vai achar o elemento com id email
  //   cy.get("#inputEmail1");

  //   //By Class value - O cypress vai achar o elemento com a classe input-email
  //   // adicionar o '.' para indicar que é uma classe
  //   cy.get(".input-full-width");

  //   //by atribute name - O cypress vai achar o elemento com o atributo name=email
  //   cy.get("[fullwidth]");

  //   //by atribute and value
  //   cy.get('[placeholder="Email"]');

  //   //by entire Classe value
  //   cy.get('[class="input-full-width size-medium shape-rectangle"]');

  //   //by two attributes
  //   cy.get('[placeholder="Email"][fullwidth]');

  //   //by tag, attribute id and class
  //   cy.get('input[id="inputEmail1"]#inputEmail1.input-full-width');

  //   // by cypress test ID
  //   cy.get('[data-cy="imputEmail1"]');
  // });

  // it.only("second test", () => {
  //   cy.visit("/");
  //   cy.contains("Forms").click();
  //   cy.contains("Form Layouts").click();

  //   //Theory
  //   // get() - find elements on page by locator globally
  //   // find() - find elements on page by locator
  //   // contains() - find HTML text and by text and locator
  //   cy.contains("Sign in");
  //   cy.contains('[status="warning"]', "Sign in");
  //   cy.contains("nb-card", "Horizontal form").find("button");
  //   cy.contains("nb-card", "Horizontal form").contains("Sign in");
  //   cy.contains("nb-card", "Horizontal form").get("button");

  //   //cypress chains and DOM
  //   cy.get("#inputEmail3")
  //     .parents("form")
  //     .find("button")
  //     .should("contain", "Sign in")
  //     .parents("form")
  //     .find("nb-checkbox")
  //     .click();
  // });

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // não é possivel fazer coisas assim, ele trabalha de forma assincrona
    // const usingTheGrid = cy.contains("nb-card", "Using the Grid");
    // usingTheGrid.find('[for="inputEmail1"]').should("contain", "Email");
    // usingTheGrid.find('[for="inputPassword2"]').should("contain", "Password");

    // 1 Cypress Alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    //2 Cypress then() method
    cy.contains("nb-card", "Using the Grid").then((usingTheGrid) => {
      cy.wrap(usingTheGrid)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGrid)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });
});
