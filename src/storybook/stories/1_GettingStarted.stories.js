import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Consumer,
  Publisher
} from "@requestnetwork/react-components";
import { RequestConsumerWrapper } from "./utils";


storiesOf("Getting Started", module)
  .add("Current Address", () => (
    <RequestConsumerWrapper>
      {requestNetwork => <div>{requestNetwork.currentAccount}</div>}
    </RequestConsumerWrapper>
  ))
  .add("Current Network", () => (
    <RequestConsumerWrapper>
      {requestNetwork => <div>{requestNetwork.currentNetwork}</div>}
    </RequestConsumerWrapper>
  ))
  .add("Is Ready", () => (
    <RequestConsumerWrapper>
      {requestNetwork => <div>{JSON.stringify(requestNetwork.isReady)}</div>}
    </RequestConsumerWrapper>
  ));
