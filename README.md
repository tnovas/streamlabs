# StreamLabs

[![Build Status](https://travis-ci.org/tnovas/streamLabs.svg?branch=master)](https://travis-ci.org/tnovas/streamLabs)
[![Coverage Status](https://coveralls.io/repos/github/tnovas/streamLabs/badge.svg?branch=master)](https://coveralls.io/github/tnovas/streamLabs?branch=master)

You need nodejs version > 6x because this Api was made with ES6.
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
var streamLabsApi = require('streamlabs');
```

Give the credentials of the StreamLabs to the constructor: `ClientId` `ClientSecret` `RedirectUrl` `Scopes`

```
var streamLabs = new streamLabsApi('clientId', 'clientSecret', 'http://redirecturl/', 'scopes');
```

## Authorization
After using Stream Labs you will need to authenticate it with StreamLabs, for that you will get an url of authorization:

```
var urlAuthorization = streamLabs.authorizationUrl();
```

You have to make a request on `urlAuthorization` with a browser and authorizate in Stream Labs. After that you will be redirect to `RedirectUrl` and you will get a `Code` on QueryString `?code='hjqweassxzass'` , then you have to call `connect` with `code` to Api

```
streamLabs.connect(code);
```

## Get Donations:
For get donations you have to call `getDonations` and stablish how much donations you want of the collection

```
function getDonations(donations) {
	console.log(donations);
}

streamLabs.getDonations(10, getDonations);
```

## Add Donation:
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

## Get Credentials:
If you need to save credentials, you have to call `getCredentials` and you will get an object

```
{
	accessToken
	refreshToken
	socketToken
}
```

### Get alerts real time:
For get alerts on real time you have to call `connectWebSocket` and you will get a token, it should be used on WebSocket in the client
```
Server Side
streamLabs.connectWebSocket((socketToken) => return socketToken);

Client Side
var socket = io('https://sockets.streamlabs.com?token=' + socketToken);
socket.on('event', (eventData) => console.log(eventData));
```