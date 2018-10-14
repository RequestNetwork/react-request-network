import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Consumer,
  Publisher
} from "@requestnetwork/react-components";


storiesOf("Getting Started", module)
  .add("Current Address", () => (
    <Consumer>
      {requestNetwork => <div>{requestNetwork.currentAccount}</div>}
    </Consumer>
  ))
  .add("Current Network", () => (
    <Consumer>
      {requestNetwork => <div>{requestNetwork.currentNetwork}</div>}
    </Consumer>
  ))
  .add("Is Ready", () => (
    <Consumer>
      {requestNetwork => <div>{JSON.stringify(requestNetwork.isReady)}</div>}
    </Consumer>
  ));
