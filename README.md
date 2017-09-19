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
```
let streamLabsModule = require('streamlabs');
```

Give the credentials of the StreamLabs to the constructor: `ClientId` `ClientSecret` `RedirectUrl` `Scopes`

```
let streamLabs = new streamLabsModule('clientId', 'clientSecret', 'http://redirecturl/', 'donations.read donations.create socket.token alerts.create');
```

### Authorization
After using StreamLabs you will need to authenticate it with StreamLabs, for that you will get an url of authorization:

```
let urlAuthorization = streamLabs.authorizationUrl();
```

You have to make a request on `urlAuthorization` with a browser and authorizate in StreamLabs. After that you will be redirect to `RedirectUrl` and you will get a `Code` on QueryString `?code='hjqweassxzass'` , then you have to call `connect` with `code` and `callback` to module

```
streamLabs.connect(code, callback);
```

### Get Donations:
For get donations you have to call `getDonations` and stablish how much donations you want of the collection

```
streamLabs.getDonations(10, (donation) => console.log(donations));
```

### Add Donation:
For add donations you have to call `addDonations` and send an object params
```
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
```
Server Side
streamLabs.connectWebSocket((socketToken) => return socketToken);

Client Side
let socket = io('https://sockets.streamlabs.com?token=' + socketToken);
socket.on('event', (eventData) => console.log(eventData));
```

### Get Credentials:
If you need to save credentials, you have to call `getCredentials` and you will get an object

```
{
	accessToken
	refreshToken
	socketToken
}
```