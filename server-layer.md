## plaid-node quickstart

[Quickstart guide](https://plaid.com/docs/quickstart)

```bash
git clone https://github.com/plaid/quickstart.git
cd quickstart/node
npm install

# Start the Quickstart with your API keys from the Dashboard
# https://dashboard.plaid.com/account/keys
APP_PORT=8000 \
PLAID_CLIENT_ID=5bb004ba05b6800011bec564 \
PLAID_SECRET=9ef11c7cd413f2a1463309850a7142 \
PLAID_PUBLIC_KEY=88a038c0956987b0027438f7596d9e \
PLAID_ENV=sandbox \
nodemon index.js
# Go to http://localhost:8000
```

## Uninstall all packages related to server-layer

body-parser
ejs
envvar
moment
plaid
