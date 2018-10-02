import React form 'react';
import CashFlow from './CashFlow';

class FinancialSnapShot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       debtToSaving: 0,
       saving: 0,
    }
  }
  render() {
    return (
      <CashFlow />
    )
  }
}

export default FinancialSnapShot;