## Backend - Wefit

Seja bem vindo ao teste de backend da Wefit.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:
```bash
    docker-compose up -D
```
o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Copie ou Renomeie o arquivo.env.example para .env

### Para instalar as dependências 
```bash
    npm install
```
### Para compilar o projeto Typescript
```bash
    npx tsc
```

### Para iniciar o servidor express basta executar o seguinte comando:
```bash
    npx ts-node src/server.ts
```

### Para testar o cadastro de usuários PJ:
```bash
curl --location 'http://localhost:3000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tipo": "juridica",
    "cnpj": "12.345.678/0001-99",
    "cpf": "123.456.789-00",
    "nome": "Empresa XYZ",
    "email": "empresa@email.com",
    "celular": "99999-9999",
    "endereco": {
      "cep": "12345-678",
      "logradouro": "Rua Exemplo",
      "numero": "100",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP"
    }
  }'
```

### Para testar o cadastro de usuários PF:
```bash
curl --location 'http://localhost:3000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tipo": "fisica",
    "cnpj": "",
    "cpf": "750.348.120-02",
    "nome": "Pessoa XYZ",
    "email": "pessoa@email.com",
    "celular": "99999-9999",
    "endereco": {
      "cep": "12345-678",
      "logradouro": "Rua Exemplo",
      "numero": "100",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP"
    }
  }'
```