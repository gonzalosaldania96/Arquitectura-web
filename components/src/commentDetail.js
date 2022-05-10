import React from 'react';
import ReactDOM from 'react-dom';
import faker from "faker";

/**
 * @author diego
 * @since
 */

const CommentDetail = (props) => {

    return (

        <div className="comment">
            <a href="/" className="avatar">
                <img alt="avatar" src={faker.image.avatar()}/>
            </a>
            <div className="content">
                <a href="/" className="author">
                    {props.author}
                </a>
                <div className="metadata">
                    <span className="data">Today at 6:00PM</span>
                </div>
                <div className="text">wewwewe </div>
            </div>
        </div>
    );
};

export default CommentDetail;