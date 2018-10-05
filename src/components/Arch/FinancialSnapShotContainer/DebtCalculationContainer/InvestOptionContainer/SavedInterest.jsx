import React from "react";

const divStyle = {
  paddingTop: "10px"
};

class SavedInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { interestSaved } = this.props;
    return <div style={divStyle}>Save interest of ${interestSaved}</div>;
  }
}

export default SavedInterest;
