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
const requestId = "0x8fc2e7f2498f1d06461ee2d547002611b801202b000000000000000000000640";

const address = "0x0e8d9cb9e11278ad6e2ba1ca90385c7295dc6532";

const project = {
    amount="100",
    category="test category",
    description="test description",
    id="test id",
    isOwner="test id owner",
    isPublished=false,
    logoUrl="test url",
    paymentAddress=address,
    projectImageUrl="test image url",
    title="test title",
    txHash=null,
  };


storiesOf("Crowdfunding", module)
  .add("Backer", () => (
    <RequestConsumer>
      {_ => <Backer requestId={requestId} component={ShowAll} />}
    </RequestConsumer>
  ))
  .add("Publisher", () => (
    <RequestConsumer>
      {_ => (
        <Publisher project={project} component={ShowAll} />
      )}
    </RequestConsumer>
  ));
