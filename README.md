# StreamLabs

[![Build Status](https://travis-ci.org/tnovas/streamLabs.svg?branch=master)](https://travis-ci.org/tnovas/streamLabs)
[![Coverage Status](https://coveralls.io/repos/github/tnovas/streamLabs/badge.svg?branch=master)](https://coveralls.io/github/tnovas/streamLabs?branch=master)

You need version > 7x of nodejs because this Api was make with ES6.
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

Pass to constructor as credentials of StreamLabs: `ClientId` `ClientSecret` `RedirectUrl` `Scopes`

```
var streamLabs = new streamLabsApi('clientId', 'clientSecret', 'http://redirecturl/', 'scopes');
```

# Autorization
After use Api you need autenticate with StreamLabs for that you will get url of autorization:

```
var urlAutorization = streamLabs.autorizationUrl();
```

You make a request on `urlAutorization` with a browser and autorizate in Stream Labs, and you will redirect to `RedirectUrl` and get a `Code` on QueryString `?code='hjqweassxzass'` and call `connect` with `code` on Api

```
streamLabs.connect(code);
```

# Get Donations:
For get donations you make a call 'getDonations' with limit of collection

```
function getDonations(donations) {
	console.log(donations);
}

streamLabs.getDonations(10, getDonations);
```

# Add Donation:
