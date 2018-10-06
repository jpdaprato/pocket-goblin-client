import React from "react";

class InputAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false
    };
    this.changeToInput = this.changeToInput.bind(this);
  }

  changeToInput() {
    const { input } = this.state;
    this.setState({
      input: !input
    });
  }

  viewSwitch() {
    const { input } = this.state;
    if (input === false) {
      return <label onClick={this.changeToInput}>$ Enter amount</label>;
    } else {
      return (
        <p>
          $
          <input
            onChange={this.props.handlePurchaseInput}
            type="number"
            placeholder="Purchase amount"
          />
        </p>
      );
    }
  }

  render() {
    return <div>{this.viewSwitch()}</div>;
  }
}

export default InputAmount;
