Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName")
    .should("be.visible")
    .type("André")
    .should("have.value", "André");
  cy.get("#lastName")
    .should("be.visible")
    .type("Scheffer")
    .should("have.value", "Scheffer");
  cy.get("#email")
    .should("be.visible")
    .type("andretcrsrs@gmail.com")
    .should("have.value", "andretcrsrs@gmail.com");
  cy.get("#phone")
    .should("be.visible")
    .type("51 99999999")
    .should("have.value", "5199999999");
  cy.get("#product").should("be.visible").select("Cursos");
  cy.get('input[type="radio"][value="elogio"]').should("be.visible").click();
  cy.get('input[type="checkbox"][value="phone"]').should("be.visible").click();
  cy.get("#open-text-area")
    .should("be.visible")
    .type("Test")
    .should("have.value", "Test");
  cy.contains("button", "Enviar").click();
});
