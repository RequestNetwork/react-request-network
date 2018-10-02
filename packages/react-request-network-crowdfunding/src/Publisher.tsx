import * as React from "react";
import { Consumer, Creator } from "@requestnetwork/react-components";

interface IProps {
  project: {
    amount: string;
    category: string;
    description: string;
    id: string;
    isOwner: boolean;
    isPublished: boolean;
    logoUrl: string;
    paymentAddress: string;
    projectImageUrl: string;
    title: string;
    txHash: string;
  };
  requestNetwork: any;
  component: any;
}


export class InnerPublisher extends React.Component<IProps> {
  render() {
    const project = this.props.project;
    const payload = {
      amount: project.amount,
      paymentAddress: project.paymentAddress,
      txHash: project.txHash,
      metadata: {
        category: project.category,
        description: project.description,
        logoUrl: project.logoUrl,
        projectImageUrl: project.projectImageUrl,
        title: project.title
      }
    };
    return (
      <Creator
        requestNetwork={this.props.requestNetwork}
        component={this.props.component}
        payload={payload}
        buttonText="PUBLISH"
      />
    );
  }
}

const Publisher = props => (
  <Consumer>
    {requestNetwork => (
      <InnerPublisher {...props} requestNetwork={requestNetwork} />
    )}
  </Consumer>
);

export default Publisher;
