import React from "react";

const divStyle = {
  padding: "5px",
  marginTop: "5%",
  marginBottom: "15px",
  textAlign: "center"
};

const InvestMessage = () => {
  return (
    <div stlye={divStyle}>
      If you choose to invest the $472 reather than spending it today, you could
      earn $2703.38 in interest. This would bring the real opportunity cost of
      waht you are spending your money on to $3175.38 after 20 years. So the
      question you should ask youself is that: Is spending $472 today worth the
      2703.38 interest earning that i would pass up
    </div>
  );
};

export default InvestMessage;
