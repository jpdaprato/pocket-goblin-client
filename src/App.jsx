import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Container from "./components/Container";

class App extends React.Component {
  componentDidMount() {
    axios
      .post("http://localhost:8000/graphql", {
        query: "{ cashFlow totalDebt totalSavings }"
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
