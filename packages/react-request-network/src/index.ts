import * as React from "react";
import RequestNetworkProvider from "./Provider";
import { Creator } from "./Creator";

interface ContextValues {
  isReady: boolean;
  networkMismatch: boolean;
  currentNetwork: string;
  currentAccount: string;
  create(paymentAddress: string, amount: string, data: any);
  get(id);
  pay(requestId: string, amount: string);
}

export { Creator };
export const { Provider, Consumer } = React.createContext(<ContextValues>{
  isReady: false,
  networkMismatch: false,
  currentNetwork: "",
  currentAccount: ""
});

export default RequestNetworkProvider;
