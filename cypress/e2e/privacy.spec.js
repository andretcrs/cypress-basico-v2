
describe("Validar página de politíca de privacidade", function () {
  it.only('Testa a página da política de privacidade de forma independente', function(){
    cy.visit("./src/privacy.html");
    cy.contains('Talking About Testing')
  })
})
