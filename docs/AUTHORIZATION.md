
## Authorization
To authenticate with OAuth you will call `authorizationUrl`. This method return a URL, you will make a request with browser and authorizate, then you will be redirect automatically to the URL passed on `redirectUrl` with a param `code` on QueryString `?code='hjqweassxzass'`

```js
const urlAuthorization = streamlabs.authorizationUrl();
```

### Get Access Token
For generate an access token and refresh token you call `connect` with the `code` you get on QueryString

| Params   | Description     | Optional | Type | 
| -------- |:---------------| :-----:| :-----:|
| **Code**  | *The code you got in the querystring* | **false** | string |

```js
streamlabs.connect(code);
```

### Get Credentials:
For get credentials you must call `credentials` and you will get an object

```js
console.log(streamlabs.credentials());

// output
{
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  expiresIn: 3600,
  socketToken: 'socket_token',
  user: {
		streamlabs: {
  			id:123,
			display_name:"YourName"
		},
		twitch: {
			id:123,
			display_name:"YourName",
			name: "your_name"
		},
		youtube: {
			id:123,
			title: 'YourName'
    },
    ...
  }
}
```

### Get token for alerts on real time:
For get token for alerts on real time you have to call `connectWebSocket` and you will get a token, it should be used on WebSocket in the client

```js
Server Side
streamlabs.connectWebSocket();
const { socketToken } = streamlabs.credentials();

Client Side
let socket = io(`https://sockets.streamlabs.com?token=${socketToken}`);
socket.on('event', eventData => console.log(eventData));
```
