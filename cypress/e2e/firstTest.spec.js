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

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //Theory
    // get() - find elements on page by locator globally
    // find() - find elements on page by locator
    // contains() - find HTML text and by text and locator
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.contains("nb-card", "Horizontal form").get("button");

    //cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

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

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });

    //3
    cy.get('[for="exampleInputEmail1"')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get('[for="exampleInputEmail1"').invoke("text").as("labelText").should;

    //4 verificar se o input tem a classe 'label'
    cy.get('[for="exampleInputEmail1"')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    //5 invocar propriedades do elemento
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // cy.get('[type="checkbox"]').uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it.only("Date picker", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", {
        month: "short",
      });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });

      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssert = selectDayFromCurrent(5);

        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });
});