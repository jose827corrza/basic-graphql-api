# Basic GraphQl API

Using express framework over JS. An GraphQl API is exposed. consists about a software which allows to create students and courses, also let add students to every course, edit the info and seek in both collections through indexes

## Installation in your local

1. Copy the repo
`cd basic-node-graphql/`
2. Install the dependencies
`npm i`
3. Set the different .env files. Two are required, first one for env itself, the other contains the DB user and password.
- .env
```bash
PORT=3000
MONGO_DB_NAME=graphql-basic
MONGO_URL=mongodb://root:root123@localhost:27017?retryWrites=true&writeConcern=majority
ENV=test
```

- db.env
```bash
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root123
```

4. Run the compose using docker for a local db, if necessary.
`docker-compose up -d mongo`

**NOTE**
A special note is required in the .env variables. the value for "ENV" will determine either the graphql is enabled or not. If this is set as "production", it will disabled it.

5. Choose the right script
- If is for develop purposes, a hotreloading might be useful, it will use "nodemon"
`npm run dev`
- Otherwise for a production enviroment
`npm run start`

### Running a query

```json
query {
  getPeople{
    _id
    name
    email
  }
}
```


### Running a mutation

Setting the mutation with the variable for the arg in createPerson
```
mutation createNewStudent($newStudent: PersonInput!) {
  createPerson(input: $newStudent) {
		name
    email
  }
}
```
And later stablish the following json structure, will create a person in the DB.
```json
{
  "newStudent": {
    "name": "Pepe perez",
    "email": "pepep@mail.com",
    "phone": "3133336666"
  }
}
```

