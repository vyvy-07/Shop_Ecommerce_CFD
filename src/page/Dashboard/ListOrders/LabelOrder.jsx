import moment from "moment/moment";
import React from "react";

const LabelOrder = ({ id, createdAt }) => {
  return (
    <div>
      <p>
        id:{id || 1} ({createdAt && moment(createdAt).format("ll")})
      </p>
    </div>
  );
};

export default LabelOrder;
