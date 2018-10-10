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
      return (
        <label onClick={this.changeToInput}>${this.props.purchaseAmount}</label>
      );
    } else {
      return (
        <p>
          {console.log(this.props)}$
          <input
            onChange={this.props.handlePurchaseInput}
            type="number"
            placeholder={this.props.purchaseAmount}
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
