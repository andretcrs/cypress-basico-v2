👋 Seja bem-vindo(a)!

# Testes automatizados com Cypress - Básico

# Descrição
- Os cenários foram criados durante o curso de cypress básico com algumas boa práticas e comandos mais utilizado em cypress.

## Pŕe requisitos 
- Git, npm e Node.js(14.21.3) instalados

## Passos para instalação das dependências

- Faça um fork do projeto em https://github.com/andretcrs/cypress-basico-v2
- Com o node instalado, execute no terminal o comando npm i na pasta do projeto

## Como rodar os testes
- Modo interativo -> npx cypress open
- Headless  -> npm run cy:run:mobile:headless
- Mobile -> npm run cy:open:mobile

## Testes CI/CD
- No arquivo .gitlab-ci.yml foram feitas algumas configuraçoẽs para que os testes sejam executados a cada commit realizado no projeto e dispara essa pipeline