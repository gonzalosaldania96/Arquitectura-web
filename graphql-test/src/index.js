import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import User from './resolvers/user';
import Post from './resolvers/post';

/**
 * @author diego
 * @since 1.0.0
 */

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {Query, Mutation, User, Post},
    context: {db}
});

server.start(() => console.log('Server is running on localhost:4000'));