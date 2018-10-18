import history from "../history.js";
import auth0 from "auth0-js";
import axios from "axios";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENTID,
    redirectUri:
      process.env.NODE_ENV === "production"
        ? process.env.AUTH0_CALLBACK
        : "http://localhost:1234/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/home");
        this.getUserInfo(authResult, this.auth0);
      } else if (err) {
        history.replace("/home");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    history.replace("/home");
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the home route
    history.replace("/home");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  getUserInfo(authResult, auth0) {
    auth0.client.userInfo(authResult.accessToken, function(err, user) {
      // This method will make a request to the /userinfo endpoint
      // and return the user object, which contains the user's information,
      // similar to the response below.
      axios
        .post("http://localhost:8000/graphql", {
          query: `{ getUserInfo(userId: "${user.sub}") }`
        })
        .then(response => {
          localStorage.setItem("userData", response.data.data.getUserInfo);
        })
        .catch(error => console.log(error));
    });
  }
}
