'use client';

import React from 'react';

type StarProps = {
  fill?: string;
  size?: number;
};

function Star({ fill = "yellow", size = 24 }: StarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M12 2L14.9 8.62L22 9.27L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.27L9.1 8.62L12 2Z"
      />
    </svg>
  );
}

type StarRatingProps = {
  rating: number;
};

function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      // Full yellow star
      stars.push(<Star key={i} fill="yellow" />);
    } else if (i === Math.ceil(rating)) {
      // Partially filled star for fractional part
      const fillPercentage = (rating % 1) * 100;
      stars.push(
        <div
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            width: "24px",
            height: "24px",
          }}
        >
          <Star fill="lightgray" />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${fillPercentage}%`,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Star fill="yellow" />
          </div>
        </div>
      );
    } else {
      // Empty gray star
      stars.push(<Star key={i} fill="lightgray" />);
    }
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
}

export default StarRating;
