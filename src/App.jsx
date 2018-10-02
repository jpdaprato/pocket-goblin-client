import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8000/graphql',
    //   data: { query: "{ hello }" }
    // })
    axios.post('http://localhost:8000/graphql', {
      query: "{ hello transactions }"
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        App component
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
