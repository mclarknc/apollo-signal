import express from 'express';
<<<<<<< HEAD
import { apolloServer } from 'apollo-server';
import schema from './data/schema.graphql';
import Mocks from './data/mocks';
=======
import Schema from './data/schema';
import Resolvers from './data/resolvers';
//import Mocks from './data/mocks';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
>>>>>>> server-only

const GRAPHQL_PORT = 8080;

const graphQLServer = express();
<<<<<<< HEAD
graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: [schema],
  mocks: Mocks,
=======

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers,
    allowUndefinedInResolve: false,
    printErrors: true,
});

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
    schema: executableSchema,
    context: {}
>>>>>>> server-only
}));

graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: 'graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
