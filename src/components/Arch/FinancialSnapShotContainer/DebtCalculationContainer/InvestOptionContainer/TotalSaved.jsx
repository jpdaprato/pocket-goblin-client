import React from "react";

const divStyle = {
  paddingTop: "10px"
};

class TotalSaved extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { totalSaved } = this.props;
    return (
      <div style={divStyle}>
        Total {`You'll`} save ${totalSaved}
      </div>
    );
  }
}

export default TotalSaved;
