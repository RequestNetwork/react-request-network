import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import RequestNetworkProvider, { Consumer, Publisher } from "../dist";

storiesOf("Getting Started", module).add("Current Address", () => (
  <RequestNetworkProvider onInit={action("connected")}>
    {
      <Consumer>
        {requestNetwork => <div>{requestNetwork.currentAccount}</div>}
      </Consumer>      
    }
  </RequestNetworkProvider>
));

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
