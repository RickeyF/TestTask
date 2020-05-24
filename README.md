# Test Task - Node REST API

### Description

- CRUD manipulations over the authors and their books
  https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
  Required endpoints

* Get authors
* Get one author
* Get books by one author
* Get one book
* Add author
* Add book
* Update author
* Update book
* Remove author
* Remove book

### Database structure

#### Author's fields

- first name
- last name
- birthday
- created at
- updated at

#### Book's fields

- title
- author
- iban
- published at
- created at
- updated at

### Task performance levels

1. CRUD logic
2. Linter + code formating
3. Validation
4. Tests

### Required packages:

```
nestjs: https://docs.nestjs.com/first-steps
node
npm
typescript
ts-node
mongodb
typeorm
dotenv
class-validator
class-transformer
```

### Additional packages:

```
@nestjs/swagger
tsconfig-paths
tslint
tslint-config-prettier
jest
prettier
nodemon
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

# e2e tests

\$ npm run test:e2e

## Stay in touch

- Author - [Mandrila Daniel]
- Website - [https://www.linkedin.com/in/daniel-mandrila-9538ab19b](https://www.linkedin.com/)
- E-mail - danumandrila@gmail.com

## License

Nest is [MIT licensed](LICENSE).
