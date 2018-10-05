# Request Network React components

This library provides a set of helpers to facilitate the initialization of the connection to **Web3** and **Request Network**. 

## Prerequisites

- node
- yarn

## Usage

### Build this library and play around
```sh
lerna bootstrap
yarn storybook
```

### Code usage in your library 
```javascript
<RequestNetworkProvider onInit={() => console.log('connected')}>
  {
    <Consumer>
      {requestNetwork => (
          <div>{requestNetwork.currentAccount}</div>
      )}
    </Consumer>
  }
</RequestNetworkProvider>
```

### Available fields

|Field|Description|
|---|---|
|isReady|set to `true` once the initialization is done|
|networkMismatch|compares the configured network with your running configuration (`REACT_APP_NETWORK` env variable)|
|currentNetwork|the configured network|
|currentAccount|the detected account (provided by web3)|

### Available Methods

|Method|Description|Parameters|
|---|---|---|
|create|Convenience method to create a Request| <ul><li>`paymentAddress` (`string`): the address that will receive the payment</li><li>`amount` (`string`): the amount to send, in string to avoid losing data</li><li>`data` (`any`): additional data</li></ul> |
|get|Convenience method to get a Request|<ul><li>`id`: an object with a `hash` property, corresponding to the transaction hash. <br>*Later, will allow to choose other identifiers*</li></ul>|
|pay|Pay the request with given ID|<ul><li>`requestId` (`string`): </li><li>`amount` (`string`): the amount to send, in string to avoid losing data</li></ul>|
