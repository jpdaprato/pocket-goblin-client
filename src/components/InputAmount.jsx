import React from "react";
import styled from "react-emotion";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  font-size: 3rem;
`;

const Input = styled("input")`
  font-size: 25px;
  width: 55%;
`;

class InputAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditting: false
    };
    this.changeLabelToInput = this.changeLabelToInput.bind(this);
    this.changeToInputLabel = this.changeToInputLabel.bind(this);
    this.handleEnterKeyup = this.handleEnterKeyup.bind(this);
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

  handleEnterKeyup(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      this.changeToInputLabel();
    }
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
          <Input
            onChange={this.props.handlePurchaseInput}
            type="number"
            placeholder={this.props.purchaseAmount}
            onKeyUp={this.handleEnterKeyup}
            onBlur={this.changeToInputLabel}
            /* eslint-disable-next-line */
            autoFocus
          />
        </p>
      );
    }
  }

  render() {
    return <Wrapper>{this.viewSwitch()}</Wrapper>;
  }
}

export default InputAmount;
