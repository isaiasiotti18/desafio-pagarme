# pagarme-challenge
This a small challenge proposed by Pagar.me

## Techs

- [X] NodeJs e Typescript
- [X] PostgreSQL
- [X] Prisma
- [X] Docker
- [X] Jest

## Teste a Api

```git

git clone https://github.com/isaiasiotti18/desafio-pagarme.git

npm install

docker run --name pagarmechallenge -p 5432:5432 -e POSTGRES_PASSWORD=mypassword, -e POSTGRES_USER=myuser -e POSTGRES_DB=mydatabase -d postgres

```

## Endpoints

[POST] : /api/v1/clients/create-client
[POST] : /api/v1/customers/create-customer
[GET] : /api/v1/transactions/transactions-list/:customerId
[POST] : /api/v1/transactions/transactions-processing

## Status

- [X] Finished!

## Author

[Linkedin - Isaias Iotti](www.linkedin.com/in/isaiasiotti)

## License

MIT License

