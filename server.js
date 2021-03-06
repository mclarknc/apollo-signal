import express from 'express';
import Schema from './data/schema';
import Resolvers from './data/resolvers';
import cors from 'cors';
//import Mocks from './data/mocks';

import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';

const GRAPHQL_PORT = 8008;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers,
    allowUndefinedInResolve: false,
    printErrors: true,
});

const logger = function(req, res, next) {
    console.log(req);
    console.log('==================================================================');
    next();
}

//graphQLServer.use(logger);
graphQLServer.use(cors({origin: 'http://localhost:3000'}));

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
    schema: executableSchema,
    context: {}
}));

graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: 'graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
