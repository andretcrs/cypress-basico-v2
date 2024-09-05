describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação e do formulário", function () {
    cy.title()
      .should("be.equal", "Central de Atendimento ao Cliente TAT");
    cy.get("#title")
      .contains("CAC TAT");
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
    cy.get("#phone-checkbox")
      .check();  // quando for campo de check mandar sempre .check() em vez de .click()
    cy.contains("button", "Enviar")
      .click();
    cy.get(".error")
      .should("be.visible");
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
    cy.contains("button", "Enviar")
      .click();
    cy.get(".error")
      .should("be.visible");
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
    cy.contains("button", "Enviar")
      .click();
    cy.get(".error")
      .should("be.visible");
  });

  it("Campo telefone continua vazio quando preenchido com valor não numérico", function () {
    cy.get("#phone")
      .should("be.visible")
      .type("aaaaaaaa")
      .should("have.value", "");
  });
  it("Preenche campos obrigatórios, anexa arquivo e envia formulário", function () {
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
    cy.get('input[type="file"]')
      .should('not.have.value')  // verifica se não tem nenhum valor
      .selectFile('cypress/fixtures/example.json')  // inserindo arquivo (anexo)
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  // verifica se na posição 0 tem um arquivo com o nome example.json

      })


    cy.contains("button", "Enviar").click();
    cy.get(".success")
      .should("be.visible");
  });
  it("Envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", function(){
    cy.get("#product")
      .select("YouTube")
      .should('have.value', "youtube") // seleciona o valor e verifica seu value
    
  })

  it("Seleciona um produto (Mentoria) por seu valor", function(){
    cy.get("#product")
      .select("mentoria")
      .should('have.value', "mentoria") // seleciona pelo value
    
  })

  it("Seleciona um produto (Mentoria) por seu valor", function(){
    cy.get("#product").select(1).should('have.value', "blog") // seleciona pela posição(indice)
    
  })

  it("Marca o tipo de atendimento Feedback", function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback")
  })

  it("Marca cada tipo de atendimento", function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio)
          .check()
        cy.wrap($radio)
          .should("be.checked")  // encontra o elemento, verifica quantos elementos possui, faz um for no radio, marca e verifica se está marcado

      })
   
  })

  it("Marca ambos checkboxes, depois desmarca o último", function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last() // pega o ultimo
      .uncheck()  // desmarca
      .should('not.be.checked')  // verifica que não está marcado
        
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')  // verifica se não tem nenhum valor
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // {action: 'drag-drop'} --> simulando como se tivesse arrastando o arquivo 
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  // verifica se na posição 0 tem um arquivo com o nome example.json

      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile') // dando um alias para o arquivo
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')  // inserindo o arquivo pelo apelido
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')  // verifica se na posição 0 tem um arquivo com o nome example.json
  })
})
 it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get('#privacy a').should('have.attr', 'target', '_blank')  // verifica se tem o atributos de abrir em uma segunda aba
 })

 it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
    .invoke('removeAttr', 'target')  //inovca o metodo removeAttr para remover o target e faz abrir na mesma guia porque o cypress não funcina com abas
    .click()

  cy.contains('Talking About Testing')
})

it('Testa a página da política de privacidade de forma independente', function(){
  cy.visit("./src/privacy.html");
  cy.contains('Talking About Testing')
})
});
