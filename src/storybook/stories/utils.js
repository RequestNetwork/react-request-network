import React from "react";
import RequestNetworkProvider, { Consumer } from "@requestnetwork/react-components";
import { action } from "@storybook/addon-actions";

export const RequestConsumerWrapper = ({ children }) => (
  <RequestNetworkProvider onInit={action("connected")}>
    {<Consumer>{children}</Consumer>}
  </RequestNetworkProvider>
);

export class StorybookShowAll extends React.Component {
  render() {
    return Object.keys(this.props).map(p => (
      <div>
        {p} : {JSON.stringify(this.props[p])}
      </div>
    ));
  }
}
