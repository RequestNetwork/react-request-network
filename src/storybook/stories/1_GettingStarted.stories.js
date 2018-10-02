import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Consumer,
  Publisher
} from "@requestnetwork/react-components";
import { RequestConsumer } from "./utils";


storiesOf("Getting Started", module)
  .add("Current Address", () => (
    <RequestConsumer>
      {requestNetwork => <div>{requestNetwork.currentAccount}</div>}
    </RequestConsumer>
  ))
  .add("Current Network", () => (
    <RequestConsumer>
      {requestNetwork => <div>{requestNetwork.currentNetwork}</div>}
    </RequestConsumer>
  ))
  .add("Is Ready", () => (
    <RequestConsumer>
      {requestNetwork => <div>{requestNetwork.isReady}</div>}
    </RequestConsumer>
  ));
