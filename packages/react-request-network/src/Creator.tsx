import * as React from "react";

interface IProps {
  payload: {
    metadata: any;
    amount: string;
    paymentAddress: string;
    txHash: string;
  };
  requestNetwork: any;
  component: any;
  buttonText
}
export class Creator extends React.Component<IProps> {
  public state = {
    broadcasting: false,
    error: false,
    message: "",
    txHash: "",
    mining: false,
    finished: false
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

  public handlePublish = (requestNetwork, payload) => {
    this.setState({ broadcasting: true });

    requestNetwork
      .create(payload.paymentAddress, payload.amount, payload.metadata)
      .on("broadcasted", ({ transaction }) => {
        this.setState({
          mining: true,
          txHash: transaction.hash,
          broadcasting: false
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
          message: err.message.slice(1, -1).toUpperCase()
        });
      });
  };

  public render() {
    const { finished, broadcasting, error, txHash, mining } = this.state;
    const { component, payload, requestNetwork, buttonText } = this.props;
    const props = {
      ready: !(
        !requestNetwork.currentAccount || requestNetwork.networkMismatch
      ),
      finished,
      message: requestNetwork.currentAccount
        ? buttonText
        : "Please Login using MetaMask",
      error,
      mining,
      broadcasting,
      publish: () => this.handlePublish(requestNetwork, payload),
      txHash
    };
    return React.createElement(component, props);
  }
}
