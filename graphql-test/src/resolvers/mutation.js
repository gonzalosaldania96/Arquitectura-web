import uuidv4 from 'uuid/v4';

/**
 * @author diego
 * @since
 */
const mutation = {

    createUser(parent, args, ctx, info) {

        const user = {

            id: uuidv4(),
            ...args.data
        };

        ctx.db.users.push(user);

        return user;
    },

    createPost(parent, args, ctx, info) {

        const post = {

            id: uuidv4(),
            title: args.title,
            author:  args.author
        };

        ctx.db.posts.push(post);

        return post;

    }

};

export {mutation as default};