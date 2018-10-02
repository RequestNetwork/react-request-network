import React from "react";
import RequestNetworkProvider, { Consumer } from "@requestnetwork/react-components";
import { action } from "@storybook/addon-actions";

export const RequestConsumer = ({ children }) => (
  <RequestNetworkProvider onInit={action("connected")}>
    {<Consumer>{children}</Consumer>}
  </RequestNetworkProvider>
);

export class ShowAll extends React.Component {
  render() {
    return Object.keys(this.props).map(p => (
      <div>
        {p} : {JSON.stringify(this.props[p])}
      </div>
    ));
  }
}
