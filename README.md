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
let streamLabsApi = require('streamlabs');
```

Give the credentials of the StreamLabs to the constructor

| Params       | Description     | Optional | 
| --------     |:---------------| :-----:|
| **ClientId**     | *The Client Id* | **false** |
| **ClientSecret** | *The Client Secret* | **false** |
| **RedirectUrl**  | *The RedirectUrl with format 'http://yourdomain/callback'* | **false** |
| **Scopes**       | *They are 4 scopes: donations.read donations.create alerts.create socket.token* | **false** |
| **AccessToken**  | *The access token if you have one* | **true** |
| **SocketToken**  | *The socket token* | **true** |

```js
let streamLabs = new streamLabsApi('clientId', 'clientSecret', 'http://yourdomain/youraction', 'donations.read donations.create alerts.create socket.token');
```

### Authorization
To authenticate with OAuth you will call `authorizationUrl` and will return an URL, you will make a request with a browser and authorizate in OAuth. After that you will be redirect to `RedirectUrl` and you will get a `code` on QueryString `?code='hjqweassxzass'`

```js
let urlAuthorization = streamLabs.authorizationUrl();
```

### Get Access Token
For generate an access token and refresh token you have to call `connect` with the `code` you got on QueryString

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Code**  | *The code you got in the querystring* | **false** |

```js
streamLabs.connect(code);
```

### Refresh Access Token
If you need refresh the access token, you have to call `reconnect` and send the `refreshToken`

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **RefreshToken**  | *The refresh token you got in credentials* | **false** |

```js
streamLabs.reconnect(refreshToken);
```

### Get Donations:
For get donations you have to call `getDonations` and stablish how much donations you want of the collection

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Limit**  | *Stablish how much donations you want of the collection* | **false** |

```js
streamLabs.getDonations(10);
```

### Add Donation:
For add donations you have to call `addDonations` and send an object params

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Donation**  | *Object with <ul>  <li>Name (string)</li>  <li>Identifier (string)</li> <li>Amount (decimal)</li> <li>Currency: (string) - See [Currency Codes](https://dev.streamlabs.com/docs/currency-codes/)</li> <li>Message (string)</li></ul>* | **false** |

```js
{
  name: 'Name of user donation',
  identifier: 'Identify user',
  amount: 'Amount',
  currency: 'USD',
  message: 'A message'	
}
```

### Get alerts real time:
For get alerts on real time you have to call `connectWebSocket` and you will get a token, it should be used on WebSocket in the client

```js
Server Side
streamLabs.connectWebSocket();
let socketToken = streamLabs.getCredentials().socketToken;

Client Side
let socket = io('https://sockets.streamlabs.com?token=' + socketToken);
socket.on('event', (eventData) => console.log(eventData));
```

### Get Credentials:
If you need to save credentials, you have to call `getCredentials` and you will get an object

```js
{
  accessToken,
  refreshToken,
  expiresIn,
  socketToken
}
```

### Promises
If you add `then` to call you will take the success of response and if you add `catch` you will take the error of response.
```js
streamLabs.getDonations(10)
	.then((res) => console.log(res)))
	.catch((err) => console.log(err)))
```

## Test Integration:
You can test the module with your productive credentials. 
First change the `clientId` and `clientSecret` in `tests/integration.js` with yours credentials, open a console and run `npm start`, open browser and type `http://localhost:8080/`

### Urls:
- `http://localhost:8080/` return the url of [authorization](#authorization), copy and paste into the url of the browser
- `http://localhost:8080/getDonations?limit=2` return two [donations](#get-donations)
- `http://localhost:8080/addDonation` [add donations](#add-donation) and return de id
- `http://localhost:8080/credentials` [get credentials](#get-credentials)
- `http://localhost:8080/connectSocket` return the [socket token](#get-alerts-real-time)
- `http://localhost:8080/reconnect` [refresh access token](#refresh-access-token)

