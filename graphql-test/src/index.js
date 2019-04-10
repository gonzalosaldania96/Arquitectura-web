import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import Subscription from './resolvers/subscription';
import User from './resolvers/user';
import Post from './resolvers/post';

/**
 * @author diego
 * @since 1.0.0
 */

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {Query, Mutation, Subscription, User, Post},
    context: {db, pubsub}
});

server.start(() => console.log('Server is running on localhost:4000'));