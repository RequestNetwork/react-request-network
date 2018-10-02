import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Consumer,
  Publisher,
  Backer
} from "@requestnetwork/react-components";

//dummy request ID from rinkeby
const requestId =
  "0x8fc2e7f2498f1d06461ee2d547002611b801202b000000000000000000000640";

storiesOf("Crowdfunding", module)
  .add("Backer", () => (
    <RequestConsumer>
      {_ => <Backer requestId={requestId} component={ShowAll} />}
    </RequestConsumer>
  ))
  .add("Publisher", () => (
    <RequestConsumer>
      {_ => (
        <Publisher requestId={requestId} component={ShowAll} />
      )}
    </RequestConsumer>
  ));
