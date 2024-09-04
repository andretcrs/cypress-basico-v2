describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação e do formulário", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    cy.get("#title").contains("CAC TAT");
  });

  it("Verifica mensagem de campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").contains("Valide os campos obrigatórios!");
  });
  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
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
    cy.get("#open-text-area")
      .should("be.visible")
      .type("Test")
      .should("have.value", "Test");
    cy.get("#phone-checkbox").click();
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .should("be.visible")
      .type("André")
      .should("have.value", "André")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .should("be.visible")
      .type("Scheffer")
      .should("have.value", "Scheffer")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .should("be.visible")
      .type("andretcrsrs@gmail.com")
      .should("have.value", "andretcrsrs@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .should("be.visible")
      .type("51 99999999")
      .should("have.value", "5199999999")
      .clear()
      .should("have.value", "");
  });
  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com e-mail com formatação inválida", function () {
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
      .type("andretcrsrs@gmail,com")
      .should("have.value", "andretcrsrs@gmail,com");
    cy.get("#phone")
      .should("be.visible")
      .type("51 99999999")
      .should("have.value", "5199999999");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor não numérico", function () {
    cy.get("#phone")
      .should("be.visible")
      .type("aaaaaaaa")
      .should("have.value", "");
  });
  it("Preenche campos obrigatórios e envia formulário", function () {
    const longText =
      "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ";
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
    cy.get('input[type="checkbox"][value="phone"]')
      .should("be.visible")
      .click();
    cy.get("#open-text-area")
      .should("be.visible")
      .type(longText)
      .should("have.value", longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });
  it("Envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
});
