/**
 *
 *
 * @author diego
 * @since
 */
const users = {

    posts(parent, args, ctx, info) {

        return posts.filter(post => post.author == parent.id);

    }
};

export {users as default};