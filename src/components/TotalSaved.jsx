import React from "react";

class TotalSaved extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { totalSaved } = this.props;
    return (
      <div style={{ paddingTop: "10px" }}>
        Total {`You'll`} save ${totalSaved}
      </div>
    );
  }
}

export default TotalSaved;
