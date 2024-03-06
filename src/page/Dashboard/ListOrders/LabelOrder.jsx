import moment from "moment/moment";
import React from "react";

const LabelOrder = ({ id, createdAt }) => {
  return (
    <div>
      <p>
        id:{id || 1} ({createdAt && moment(createdAt).endOf("day").fromNow()})
      </p>
    </div>
  );
};

export default LabelOrder;
