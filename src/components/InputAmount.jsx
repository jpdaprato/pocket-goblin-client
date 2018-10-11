import React from "react";
import styled from "react-emotion";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  font-size: 5rem;
`;

const Input = styled("input")`
  font-size: 36px;
`;

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
          <Input
            onChange={this.props.handlePurchaseInput}
            type="number"
            placeholder={this.props.purchaseAmount}
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
