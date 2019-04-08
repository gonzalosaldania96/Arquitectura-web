import { GraphQLServer } from 'graphql-yoga';

/**
 * @author diego
 * @since 1.0.0
 */

const posts = [
    {id: '10', title: 'Post 1', body: 'Test Body', published: true, author: 1},
    {id: '11', title: 'Post 2', body: 'Test Body', published: true, author: 1},
    {id: '12', title: 'Post 3', body: 'Test Body', published: true, author: 2},
    {id: '13', title: 'Post 4', body: 'Test Body', published: true, author: 2},
    {id: '14', title: 'Post 5', body: 'Test Body', published: true, author: 2}
];

const users = [
    {id: '1', name: 'Diego', email: 'blah@gmail.com'},
    {id: '2', name: 'Sebastian', email: 'sebas@gmail.com'}
];


const typeDefs = `

    type Query {
        me: User!
        posts: [Post!]!
        users(query: String): [User!]!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    
`;


const resolvers = {

    Query: {

        me() {

            return {id: '1000', name: 'Diego', email: 'diegosm@palermo.edu', age: 23};
        },

        posts(parent, args, ctx, info) {

            console.log(args);

            return posts;
        },

        users(parent, args, ctx, info) {

            if(!args.query) return users;

            return users.filter(user => user.name.toLowerCase() === args.query.toLowerCase());
        }
    },

    Post: {

        author(parent, args, ctx, info) {

            return users.find(user => parent.author == user.id);
        }

    },

    User: {

        posts(parent, args, ctx, info) {

            return posts.filter(post => post.author == parent.id);

        }

    }

};


const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));