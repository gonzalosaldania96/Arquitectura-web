/**
 *
 *
 * @author diego
 * @since
 */
const posts = {

    author(parent, args, ctx, info) {

        return users.find(user => parent.author == user.id);
    }


};

export {posts as default};
