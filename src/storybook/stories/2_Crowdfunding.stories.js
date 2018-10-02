import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, {
  Publisher,
  Backer
} from "@requestnetwork/crowdfunding-react-components";
import { RequestConsumerWrapper, StorybookShowAll } from "./utils";

//dummy request ID from rinkeby
const requestId = "0x8fc2e7f2498f1d06461ee2d547002611b801202b000000000000000000000640";

const address = "0x0e8d9cb9e11278ad6e2ba1ca90385c7295dc6532";

const project = {
  amount: "100",
  category: "test category",
  description: "test description",
  id: "test id",
  isOwner: "test id owner",
  isPublished: false,
  logoUrl: "test url",
  paymentAddress: address,
  projectImageUrl: "test image url",
  title: "test title",
  txHash: null
};

storiesOf("Crowdfunding", module)
  .add("Backer", () => (
    <RequestConsumerWrapper>
      {_ => <Backer requestId={requestId} component={StorybookShowAll} />}
    </RequestConsumerWrapper>
  ))
  .add("Publisher", () => (
    <RequestConsumerWrapper>
      {_ => <Publisher payload={project} component={StorybookShowAll} />}
    </RequestConsumerWrapper>
  ));
