import React from 'react';

const Comments = (props) => {
  const { review } = props;
  return (
    <li className="collection-item avatar z-depth-1">
      <img
        src={review.User.imageUrl}
        alt=""
        className="circle responsive-img"
      />
      <span className="title strong">{review.User.firstName}</span>
      <p>
        {review.comment}
      </p>
      <a href="#!" className="secondary-content" />
    </li>
  );
};

export default Comments;
