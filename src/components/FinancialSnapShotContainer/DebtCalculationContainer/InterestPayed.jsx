import React from "react";

const InterestPayed = ({ totalInterest }) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      Interest {`You'll`} Pay ${totalInterest}
    </div>
  );
};

export default InterestPayed;
