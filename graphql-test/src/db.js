/**
 * @author diego
 * @since
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

const db = {

    users,
    posts
};

export {db as default};


