# StreamLabs

[![Build Status](https://travis-ci.org/tnovas/streamLabs.svg?branch=master)](https://travis-ci.org/tnovas/streamLabs)
[![Coverage Status](https://coveralls.io/repos/github/tnovas/streamLabs/badge.svg)](https://coveralls.io/github/tnovas/streamLabs)

#### This module is a implementation of Streamlabs API https://dev.streamlabs.com/

You need nodejs version > 6x because this module was made with ES6.
```
node --version
```

## Installation:
Add the latest version of `streamlabs` to your package.json:
```
npm install streamlabs --save
```

## Usage:
```js
const StreamlabsApi = require('streamlabs');
```

Give the credentials of the StreamLabs to the constructor

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **clientId**     | *The Client Id* | **false** |  string |
| **clientSecret** | *The Client Secret* | **false** | string |
| **redirectUrl**  | *The RedirectUrl with format 'http://yourdomain/callback'* | **false** | string |
| **scopes**       | *They are 4 scopes: donations.read donations.create alerts.create socket.token* | **false** | string |
| **socketToken**  | *The socket token* | **true** | string |
| **accessToken**  | *The access token if you have one* | **true** | string |

```js
const streamlabs = new StreamlabsApi({
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  redirectUrl: 'http://yourdomain/yourrequest',
  scopes: 'donations.read donations.create alerts.create socket.token alerts.write points.write points.read credits.write jar.write wheel.write',
});
```


------------

------------



- ####[Authorization](./docs/AUTHORIZATION.md)

- ####[Alerts](./docs/ALERTS.md)

- ####[Donations](./docs/DONATIONS.md)

- ####[Loyalty](./docs/LOYALTY.md)

- ####[Wheel](./docs/WHEEL.md)

- ####[Jar](./docs/JAR.md)

- ####[Credits](./docs/CREDITS.md)

------------


------------


## Test Integration:
You can test the module with your productive credentials. 
First change the `clientId` and `clientSecret` in `tests/integration/streamlabs.js` with yours credentials, open a console and run `npm start`, open browser and type `http://localhost:8080/`

**WARNING** Always when you run npm start, the first link you click should be Authorization
