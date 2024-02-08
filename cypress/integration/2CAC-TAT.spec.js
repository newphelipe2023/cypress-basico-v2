// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />
  //O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    //abrir o site antes de cada teste
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = 'Desde que Vasco e Bahia se enfrentaram pela última vez, em agosto do ano passado pela Série B, muita coisa mudou dos dois lados. O cruz-maltino passava por ajustes iniciais depois de vender a SAF para a 777 Partners, e o Bahia ainda não havia formalizado o acordo com o Grupo City, que será acertado oficialmente na quarta-feira, mas o acordo já está em vigor desde dezembro.'
        cy.get('#firstName').type('Phelipe')
        cy.get('#lastName').type('Rocha')
        cy.get('#email').type('pheliperocha@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Phelipe')
        cy.get('#lastName').type('Rocha')
        cy.get('#email').type('pheliperocha$gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone vazio quando preenche valores nao numericos', function(){
        cy.get('#phone')
        .type('abcdefghi')
        .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function(){
        cy.get('#firstName').type('Phelipe')
        cy.get('#lastName').type('Rocha')
        cy.get('#email').type('pheliperocha$gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Phelipe')
        .should('have.value', 'Phelipe')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('Rocha')
        .should('have.value', 'Rocha')
        .clear()
        .should('have.value', '')
        cy.get('#email').type('pheliperocha@gmail.com')
        .should('have.value', 'pheliperocha@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#phone').type('992879488')
        .should('have.value', '992879488')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longtext = 'Desde que Vasco e Bahia se enfrentaram pela última vez, em agosto do ano passado pela Série B, muita coisa mudou dos dois lados. O cruz-maltino passava por ajustes iniciais depois de vender a SAF para a 777 Partners, e o Bahia ainda não havia formalizado o acordo com o Grupo City, que será acertado oficialmente na quarta-feira, mas o acordo já está em vigor desde dezembro.'
        cy.get('#firstName').type('Phelipe')
        cy.get('#lastName').type('Rocha')
        cy.get('#email').type('pheliperocha@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
 //Campo do tipo Select   
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
//Tipo Radio
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
          .should('have.value', 'feedback')
    })
//each serve para selecionar a quantidade
//cy.wrap serve para escolher uma a uma as opções de uma lista e validar
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
          })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function(){
      cy.get('#firstName').type('Phelipe')
      cy.get('#lastName').type('Rocha')
      cy.get('#email').type('pheliperocha$gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('teste')
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
  })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json') 
            /*a função de callback do should, recebe o elemento input inserido no cy.get acima, o input[0] indica que 
            foi selecionado o primeiro input, e o mesmo vale para files[0], questionando se o primeiro arquivo tem o
            nome 'example.json'.
            */
        })
  })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json') 
        })
  })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json') 
    })
  })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
  })
    it('testa a página da política de privacidade de forma independente', function(){
      cy.visit('./src/privacy.html')

      cy.contains('Talking About Testing').should('be.visible')
  })
  //Aula 8. Simulando o Viewport de um dispositivo móvel
    it('preenche os campos obrigatórios e envia o formulário com clock e tick', function(){
    const longtext = 'Desde que Vasco e Bahia se enfrentaram pela última vez, em agosto do ano passado pela Série B, muita coisa mudou dos dois lados. O cruz-maltino passava por ajustes iniciais depois de vender a SAF para a 777 Partners, e o Bahia ainda não havia formalizado o acordo com o Grupo City, que será acertado oficialmente na quarta-feira, mas o acordo já está em vigor desde dezembro.'
    cy.clock()
    
    cy.get('#firstName').type('Phelipe')
    cy.get('#lastName').type('Rocha')
    cy.get('#email').type('pheliperocha@gmail.com')
    cy.get('#open-text-area').type(longtext, {delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  Cypress._.times(3, function() {
    it('campo telefone vazio quando preenche valores nao numericos, com times',function() { 
      cy.get('#phone')
      .type('abcdefghi')
      .should('have.value','')
    })
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a aba de texto usando o comando invoke', function(){
    const longtext = Cypress._.repeat('0123456789', 20)
    cy.get('#open-text-area')
      .invoke('val', longtext)
      .should('have.value', longtext)
  })
  it('faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response) {
      console.log(response)
      const { status, statusText, body} = response //extraindo informações da response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })
  it('encontra o gato escondido', function() {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu 💚 gatos') //emojis retirados do site https://emojipedia.org/red-heart
  })
})
