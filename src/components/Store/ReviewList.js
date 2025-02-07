import React from "react";
import PropTypes from "prop-types";
import imgdefault from "../../assets/images/imgdefault.png";

function ReviewList({ reviews, onDelete }) {
  return (
    <div className="reviewContent">
      {reviews.map((review, idx) => (
        <div key={idx} className="reviewItem">
          <img
            className="reviewuserImg"
            src={review?.profileUrl ? review.profileUrl : imgdefault}
          />
          <div className="reviewWrap">
            <div className="reviewInfo">
              <div className="reviewUser">
                <p className>{review?.userNickName}</p>
              </div>
              <p className="reviewText">{review?.content}</p>
            </div>
            <button
              className="deleteReviewBtn"
              onClick={() => onDelete(review?.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReviewList;
