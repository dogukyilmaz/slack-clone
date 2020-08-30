import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploadState, uploadPercentage }) => {
  return (
    uploadState === "uploading" && (
      <Progress
        className="progress__bar"
        percent={uploadPercentage}
        size="small"
        progress
        indicating
        inverted
      />
    )
  );
};

export default ProgressBar;
