// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'pocketgoblin.auth0.com',
    clientID: 'czaH6MGiqMmlNgJ8f1ipL2IZnlkusAgK',
    redirectUri: 'http://localhost:1234/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}