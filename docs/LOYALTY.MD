## LOYALTY

### Get
For get points information of users you must call `loyalty.get` and send channel name and array of users

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **channel**     | *The name of channel* | **false** |  string |
| **users** | *The names of users* | **false** | string[] |

```js
streamlabs.loyalty.get('channelName', ['user']);
```

### Detail
For get detail information of user you must call `loyalty.detail` and send channel name and user

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **channel**     | *The name of channel* | **false** |  string |
| **user** | *The name of user* | **false** | string |

```js
streamlabs.loyalty.detail('channelName', 'user');
```

### Query
For search users with loyalty information you must call `loyalty.query` and send an object param

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **query**  | *Object with <ul>  <li>user (string)</li>  <li>sort (type)</li> <li>order (type)</li> <li>limit (integer)</li> <li>page (integer)</li></ul>* | **false** |

```js
const { sort, order } = streamlabs.loyalty.types;

streamlabs.loyalty.query({
  user: 'user',
  sort: sort.asc, // asc or desc
  order: order.points, // username, points or timeWatched 
  limit: 10,
  page: 1,
});
```

### Subtract
For subtract points of user you must call `loyalty.subtract` and send channel name, user and points

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **channel**     | *The name of channel* | **false** |  string |
| **user** | *The name of user* | **false** | string |
| **points** | *The points* | **false** | integer |

```js
streamlabs.loyalty.subtract('channelName', 'user', 10);
```

### Edit
For edit points of user you must call `loyalty.edit` and send user and points

| Params       | Description     | Optional | Type |
| --------     |:---------------| :-----:| :-----:|
| **user** | *The name of user* | **false** | string |
| **points** | *The points* | **false** | integer |

```js
streamlabs.loyalty.edit('user', 10);
```

### Reset
For reset all users points you must call `loyalty.reset`.

```js
streamlabs.loyalty.reset();
```