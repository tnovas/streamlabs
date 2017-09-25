# StreamLabs

[![Build Status](https://travis-ci.org/tnovas/streamLabs.svg?branch=master)](https://travis-ci.org/tnovas/streamLabs)
[![Coverage Status](https://coveralls.io/repos/github/tnovas/streamLabs/badge.svg)](https://coveralls.io/github/tnovas/streamLabs)

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
| **RedirectUrl**  | *The RedirectUrl with format 'http://yourdomain/youraction'* | **false** |
| **Scopes**       | *They are 3 scopes: donations.read donations.create alerts.create* | **false** |
| **AccessToken**  | *The access token*  | **true** |
| **RefreshToken** | *The refresh token* | **true** |
| **SocketToken**  | *The socket token* | **true** |

```js
let streamLabs = new streamLabsApi('clientId', 'clientSecret', 'http://yourdomain/youraction', 'donations.read donations.create alerts.create');
```

**If you send `AccessToken` and `SocketToken` to the constructor you can call any function without call `#Authorization`**

### Authorization
After using StreamLabs you will need to authenticate it with StreamLabs, for that you will get an url of authorization:

```js
let urlAuthorization = streamLabs.authorizationUrl();
```

You have to make a request on `urlAuthorization` with a browser and authorizate in StreamLabs. After that you will be redirect to `RedirectUrl` and you will get a `Code` on QueryString `?code='hjqweassxzass'` , then you have to call `connect` with `code`

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Code**  | *The code you got in the querystring* | **false** |
| **Success**  | *Callback on Success*| **true** |
| **Error**    | *Callback on Error*  | **true** |

```js
streamLabs.connect(code);
```

### Get Donations:
For get donations you have to call `getDonations` and stablish how much donations you want of the collection

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Limit**  | *Stablish how much donations you want of the collection* | **false** |
| **Success**  | *Callback on Success*| **true** |
| **Error**    | *Callback on Error*  | **true** |

```js
streamLabs.getDonations(10, (donation) => console.log(donations));
```

### Add Donation:
For add donations you have to call `addDonations` and send an object params

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Donation**  | *Object with <ul>  <li>Name (string)</li>  <li>Identifier (string)</li> <li>Amount (decimal)</li> <li>Currency: (string) - See [Currency Codes](https://dev.streamlabs.com/docs/currency-codes/)</li> <li>Message (string)</li></ul>* | **false** |
| **Success**  | *Callback on Success*| **true** |
| **Error**    | *Callback on Error*  | **true** |

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

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Success**  | *Callback on Success*| **true** |
| **Error**    | *Callback on Error*  | **true** |

```js
Server Side
streamLabs.connectWebSocket((socketToken) => socketToken);

Client Side
let socket = io('https://sockets.streamlabs.com?token=' + socketToken);
socket.on('event', (eventData) => console.log(eventData));
```

### Get Credentials:
If you need to save credentials, you have to call `getCredentials` and you will get an object

```js
{
  accessToken
  refreshToken
  socketToken
}
```