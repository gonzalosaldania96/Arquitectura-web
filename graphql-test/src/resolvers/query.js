/**
 *
 *
 * @author diego
 * @since
 */

const query = {

    me() {

        return {id: '1000', name: 'Diego', email: 'diegosm@palermo.edu', age: 23};
    },

    posts(parent, args, ctx, info) {

        return ctx.db.posts;
    },

    users(parent, args, ctx, info) {

        if(!args.query) return ctx.db.users;

        return ctx.db.users.filter(user => user.name.toLowerCase() === args.query.toLowerCase());
    }

};

export {query as default};