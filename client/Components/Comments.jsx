import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const Comments = props => (
  <li className="collection-item avatar z-depth-1">
    <img
      src={props.review.User.imageUrl}
      alt="profile"
      className="circle responsive-img"
    />
    <span className="text-title bold">{props.review.User.firstName}</span>
    <p
      style={{ wordWrap: 'break-word' }}
    >
      {props.review.comment}
    </p>
    <div className="secondary-content">
      { moment(new Date(props.review.createdAt)).fromNow()}
    </div>
  </li>
);

Comments.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    createdAt: PropTypes.string,
    User: PropTypes.shape({
      firstName: PropTypes.string,
      imageUrl: PropTypes.string
    })
  }).isRequired
};

export default Comments;
