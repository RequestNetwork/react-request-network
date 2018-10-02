import * as React from 'react';
import { Consumer } from "@requestnetwork/react-components";

interface IProps {
  requestId: string;
  requestNetwork: any;
  component: any;
}

export class InnerBacker extends React.Component<IProps> {
  public state = {
    backed: false,
    metaMaskLoading: false,
  };
  public handleSubmit = async (amount:number, requestId:string, requestNetwork) => {
    this.setState({ metaMaskLoading: true });
    const amountInWei = amount * Math.pow(10, 18);
    requestNetwork
      .pay(requestId, amountInWei.toString())
      .on('broadcasted', () =>
        this.setState({ backed: true, metaMaskLoading: false })
      )
      .catch(() => this.setState({ metaMaskLoading: false }));
  };

  public render() {
    const { component, requestNetwork, requestId } = this.props;
    const { metaMaskLoading, backed } = this.state;
    const props = {
      backed,
      metaMaskLoading,
      disabled: !requestId,
      isReady: requestNetwork.isReady,
      metaMaskDisabled: !requestNetwork.currentAccount,
      pay: (amount:number) => this.handleSubmit(amount, requestId, requestNetwork),
    };
    return React.createElement(component, props);
  }
}
const Backer = props => (
  <Consumer>
    {requestNetwork => (
      <InnerBacker {...props} requestNetwork={requestNetwork} />
    )}
  </Consumer>
);
export default Backer;
