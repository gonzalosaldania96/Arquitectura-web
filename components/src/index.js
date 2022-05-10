import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './commentDetail';

/**
 * @author diego
 * @since
 */

const App = () => {

    return (
        <div className="ui container comments">
            <CommentDetail author="wewe"/>
        </div>
    );
};


ReactDOM.render(<App/>, document.querySelector('#root'));