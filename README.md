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

Give constructor credentials of StreamLabs: `ClientId` `ClientSecret` `RedirectUrl` `Scopes`

```
var streamLabs = new streamLabsApi('clientId', 'clientSecret', 'http://redirecturl/', 'scopes');
```

## Authorization
After using Stream Labs you will need to authenticate with StreamLabs, for that you will get url of authorization:

```
var urlAuthorization = streamLabs.authorizationUrl();
```

You have to make a request on `urlAuthorization` with a browser and authorizate in Stream Labs, and you will be redirect to `RedirectUrl` and get a `Code` on QueryString `?code='hjqweassxzass'` and call `connect` with `code` on Api

```
streamLabs.connect(code);
```

## Get Donations:
For get donations you have to make a call `getDonations` with limit of collection

```
function getDonations(donations) {
	console.log(donations);
}

streamLabs.getDonations(10, getDonations);
```

## Add Donation:
For add donations you have make a call `addDonations` with object params
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
If you need save credentials call `getCredentials` and get an object with

```
{
	accessToken
	refreshToken
	socketToken
}
```

## Get alerts realtime:
For get alerts realtime you have make a call to `connectWebSocket` and will return a token and should be use in url WebSocket in the client
```
Server Side
streamLabs.connectWebSocket((socketToken) => return socketToken);

Client Side
var socket = io('https://sockets.streamlabs.com?token=' + socketToken);
socket.on('event', (eventData) => console.log(eventData));
```