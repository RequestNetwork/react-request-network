import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Consumer,
  Publisher
} from "../../../packages/react-request-network/dist";

storiesOf("Getting Started", module)
  .add("Current Address", () => (
    <RequestNetworkProvider onInit={action("connected")}>
      {
        <Consumer>
          {requestNetwork => <div>{requestNetwork.currentAccount}</div>}
        </Consumer>
      }
    </RequestNetworkProvider>
  ))
  .add("Current Network", () => (
    <RequestNetworkProvider onInit={action("connected")}>
      {
        <Consumer>
          {requestNetwork => <div>{requestNetwork.currentNetwork}</div>}
        </Consumer>
      }
    </RequestNetworkProvider>
  ))
  .add("Is Ready", () => (
    <RequestNetworkProvider onInit={action("connected")}>
      {
        <Consumer>
          {requestNetwork => <div>{requestNetwork.isReady}</div>}
        </Consumer>
      }
    </RequestNetworkProvider>
  ));

