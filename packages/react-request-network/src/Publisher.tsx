import * as React from 'react';
import { Consumer } from './index';

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
  public state = {
    broadcasting: false,
    error: false,
    message: '',
    txHash: '',
    mining: false,
    finished: false,
  };
  public getRequest = async hash => {
    const { requestNetwork } = this.props;
    try {
      const response = await requestNetwork.get({ hash });
      if (!response.request) {
        return setTimeout(() => this.getRequest(hash), 1000);
      }
    } catch (e) {
      return setTimeout(() => this.getRequest(hash), 1000);
    }
    return this.setState({ mining: false, finished: true });
  };

  public handlePublish = (
    requestNetwork,
    {
      amount,
      paymentAddress,
      category,
      description,
      logoUrl,
      projectImageUrl,
      title,
    }
  ) => {
    this.setState({ broadcasting: true });

    requestNetwork
      .create([paymentAddress], [amount], {
        category,
        description,
        logoUrl,
        projectImageUrl,
        title,
      })
      .on('broadcasted', ({ transaction }) => {
        this.setState({
          mining: true,
          txHash: transaction.hash,
          broadcasting: false,
        });
        this.getRequest(transaction.hash);
      })
      .then(() => {
        this.setState({ finished: true });
      })
      .catch(err => {
        return this.setState({
          error: true,
          broadcasting: false,
          message: err.message.slice(1, -1).toUpperCase(),
        });
      });
  };

  public render() {
    const { finished, broadcasting, error, txHash, mining } = this.state;
    const { component, project, requestNetwork } = this.props;
    const props = {
      ready: !(
        !requestNetwork.currentAccount || requestNetwork.networkMismatch
      ),
      finished,
      message: requestNetwork.currentAccount
        ? 'PUBLISH'
        : 'Please Login using MetaMask',
      error,
      mining,
      broadcasting,
      publish: () => this.handlePublish(requestNetwork, project),
      txHash,
    };
    return React.createElement(component, props);
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
