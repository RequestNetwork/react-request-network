import * as React from 'react';
import { createRequest, getRequest, payRequest } from './utils';
import RequestNetworkProvider from './Provider';
import Publisher from './Publisher';
import Backer from './Backer';

export const { Provider, Consumer } = React.createContext({
  isReady: false,
  networkMismatch: false,
  currentNetwork: '',
  currentAccount: '',
  create: createRequest,
  get: getRequest,
  pay: payRequest,
});

export { Publisher, Backer };
export default RequestNetworkProvider;
