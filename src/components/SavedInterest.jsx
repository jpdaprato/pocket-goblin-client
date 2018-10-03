import React from "react";

class SavedInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { interestSaved } = this.props;
    return (
      <div style={{ paddingTop: "10px" }}>
        Save interest of ${interestSaved}
      </div>
    );
  }
}

export default SavedInterest;
