import React from "react";

class InputAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditting: false
    };
    this.changeLabelToInput = this.changeLabelToInput.bind(this);
    this.changeToInputLabel = this.changeToInputLabel.bind(this);
  }

  changeLabelToInput() {
    this.setState({
      isEditting: true
    });
  }
  changeToInputLabel() {
    this.setState({
      isEditting: false
    });
  }

  viewSwitch() {
    const { isEditting } = this.state;
    if (isEditting === false) {
      return (
        <label onClick={this.changeLabelToInput}>
          ${this.props.purchaseAmount}
        </label>
      );
    } else {
      return (
        <p>
          $
          <input
            onChange={this.props.handlePurchaseInput}
            type="number"
            placeholder={this.props.purchaseAmount}
            onBlur={this.changeToInputLabel}
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
