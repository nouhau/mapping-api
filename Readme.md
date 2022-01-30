# Nouhau Mapping API

#### API para mapeamento de perfil

### Este projeto usa
- Node
- Typescript
- Jest
- Postgres
- TypeORM

### Como rodar o projeto

1 - Clone o repositório

3 - Instale o Docker

---
  https://www.docker.com/products/docker-desktop
---


3 - Instale todas as dependências

---
  yarn install
---

4 - Execute o projeto

---
  docker-compose up -d
  yarn service run:dev
---

5 - Acesse a rota principal

<http://localhost:5000/>

6 - Aplique os padrões de código

---
  yarn lint:fix
---

### Testando o projeto

#### Testes unitários

---
  yarn test:unit
---

#### Testes de integração

---
  yarn test:integration
---
