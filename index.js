// 'use strict'

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { buildSchema } = require('graphql')
const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const loadFiles = require('graphql-import');
const cors = require('cors');

const config = require('./config');

// defining schema, using GraphQl schema language
const isDev = config.environment !== 'production' // Si no es va a retornar true y ejar el graphql activo
const port = config.port;
// Schemas must be loaded from the .graphql file
// const schema = buildSchema(`
//     type Query {
//         hello: String,
//         saludo: String
//     }
// `);
const typeDefs = loadFiles.importSchema('**/*.graphql');
let resolvers = require('./resolvers/resolver');
const schema = makeExecutableSchema({ typeDefs, resolvers});
// const schema = buildSchema(loadFiles.importSchema('**/*.graphql'))
// Forma antigua
// graphql(schema, '{ hello }').then((data) => {
//     console.log(data);
// })

// Provides a RESOLVER function for each API endpoint
// let rootValue = { hello: () =>  'Hello World!', saludo: () => 'Holis'};
let rootValue = resolvers;

// The query '{ hello }'
// let source = '{ hello }';
// graphql({ schema, source, rootValue}).then((data) => {
//     console.log(data);
// })

const app = express();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Basic GraphQl API, developed by JoseDev');
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: isDev, // Entorno de desarrollo, false
}));
app.listen(port);
console.log(`Running on port ${port} using express graphql`);