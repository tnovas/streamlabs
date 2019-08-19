## DONATIONS

### Get:
For get donations you must call `donations.get` and stablish how much donations you want.

| Params   | Description     | Optional | Type | 
| -------- |:---------------| :-----:| :-----:|
| **limit**  | *Stablish how much donations you want* | **false** | integer |

```js
streamlabs.donations.get(10);
```

### Add:
For add donations you must call `donations.add` and send an object params.

| Params   | Description     | Optional | 
| -------- |:---------------| :-----:|
| **Donation**  | *Object with <ul>  <li>Name (string)</li>  <li>Identifier (string)</li> <li>Amount (double)</li> <li>Currency: (string) - See [Currency Codes](https://dev.streamlabs.com/docs/currency-codes/)</li> <li>Message (string)</li></ul>* | **false** |

```js
streamlabs.donations.add({
  name: 'Name_of_user_donation',
  identifier: 'Identifyuser@user.com',
  amount: 10.20,
  currency: 'USD',
  message: 'A message'	
});
```