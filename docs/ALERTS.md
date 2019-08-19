## ALERTS

### Create
For create an alert you must call `alerts.create` and send an object param

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **alert**  | *Object with <ul>  <li>type (type)</li>  <li>message (string)</li> <li>user_message (string)</li></ul>* | **false** |

```js
const { follow, subscription, donation, host } = streamlabs.alerts.types;

streamlabs.alerts.create({
  type: donation, // follow, subscription, donation or host.
  message: 'simple geometry',
  user_message: 'I am second heading',
});
```

### Volume
For mute or unmute volume on alerts you must call `alerts.volume` and send the action

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **action**     | *The action will trigger* | **false** |  type |

```js
const { mute, unmute } = streamlabs.alerts.actions.volume;

streamlabs.alerts.volume(mute);

streamlabs.alerts.volume(unmute);
```

### Queue
For pause or unpause queue of alerts you must call `alerts.queue` and send the action

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **action**     | *The action will trigger* | **false** |  type |

```js
const { pause, unpause } = streamlabs.alerts.actions.queue;

streamlabs.alerts.queue(pause);

streamlabs.alerts.queue(unpause);
```

### Video
For show or hide video of alerts you must call `alerts.video` and send the action

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **action**     | *The action will trigger* | **false** |  type |

```js
const { show, hide } = streamlabs.alerts.actions.video;

streamlabs.alerts.video(show);

streamlabs.alerts.video(hide);
```

### Skip
For skip all alerts you must call `alerts.skip`

```js
streamlabs.alerts.skip();
```
