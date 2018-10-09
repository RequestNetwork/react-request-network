# Request Network React components

Forget about initializing web3 and the RequestNetwork provider just start using Request now.


This library provides a set of helpers to facilitate the initialization of the connection to **Web3** and **Request Network**. 

## Prerequisites

- node
- yarn

## Usage

```sh
# contains RequestNetworkProvider
npm i @requestnetwork/react-components
# contains crowdfunding specific components
npm i @requestnetwork/crowdfunding-react-components
```

### Code usage in your library 
```javascript
<RequestNetworkProvider onInit={() => console.log('connected')}>
    <Consumer>
      {requestNetwork => (
          <div>{requestNetwork.currentAccount}</div>
      )}
    </Consumer>
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


### Domain Specific Packages

#### crowdfunding-react-components

##### Available Components
Publisher: create a crowdfunding request
Backer: Pay a crowdfunding request

##### Example

```js
import React, { Fragment} from "react";


import RequestNetworkProvider, {
  Publisher,
  Backer
} from "@requestnetwork/crowdfunding-react-components";

// entrypoint
default () => (
 <RequestNetworkProvider onInit={() => console.log('ready')}>
    <Examples />
 </RequestNetworkProvider>
)

const project = {
  amount: "100",
  category: "test category",
  description: "test description",
  id: "test id",
  isOwner: "test id owner",
  isPublished: false,
  logoUrl: "test url",
  paymentAddress: address,
  projectImageUrl: "test image url",
  title: "test title",
  txHash: null
};
const requestId = "0x8fc2e7f2498f1d06461ee2d547002611b801202b000000000000000000000640";

const address = "0x0e8d9cb9e11278ad6e2ba1ca90385c7295dc6532";

const Examples = () => (
<Fragment>
  <Backer requestId={requestId} component={props => console.log(props)} />
  <Publisher payload={project} component={StorybookShowAll} />
</Fragment>
```

### Build this library and play around
```sh
lerna bootstrap
yarn storybook
```
