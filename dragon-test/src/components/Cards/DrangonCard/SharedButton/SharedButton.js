import React from "react";

import { LinkedinShareButton } from "react-share";

const SharedButton = () => {
  const shareUrl = "https://www.linkedin.com/in/debora-barto/";
  return (
    <LinkedinShareButton
      url={shareUrl}
      quote={"Seja bem vindo, vamos conversar?"}
      hashtag={"#linkedin..."}
    >
      <button className="Card-IconsRow-SharedBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#680e81"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </LinkedinShareButton>
  );
};
export default SharedButton;
