import * as React from 'react';
import { Provider } from './index';
import Web3 from 'web3';
import { createRequest, getRequest, payRequest } from './utils';

interface IWindow extends Window {
  web3: Web3;
}

declare const window: IWindow;

const ETH_NETWORKS = {
  1: {
    url: 'https://mainnet.infura.io/BQBjfSi5EKSCQQpXebO',
    name: 'main',
  },
  4: {
    url: 'https://rinkeby.infura.io/BQBjfSi5EKSCQQpXebO',
    name: 'rinkeby',
  },
};

interface IProps {
  onInit: () => void;
}

const NETWORK_NAME = process.env.REACT_APP_NETWORK;

export class RequestNetworkProvider extends React.Component<IProps> {
  public state = {
    requestNetwork: undefined,
    currentAccount: '',
    currentNetwork: '',
  };
  private interval;

  public initPoll() {
    if (!this.interval) {
      this.interval = setInterval(this.fetchAccounts, 1000);
    }
  }

  public initRequestProvider(web3, networkId) {
    import('@requestnetwork/request-network.js')
      .then(RequestNetwork => {
        return this.setState({
          requestNetwork: new RequestNetwork.default(
            web3.currentProvider,
            networkId
          ),
          currentNetwork: ETH_NETWORKS[networkId].name,
        });
      })
      .catch(e => console.error(e));
  }

  public async initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
      const networkId = await web3.eth.net.getId();
      this.initRequestProvider(web3, networkId);
    } else {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(ETH_NETWORKS[4].url)
      );
      const networkId = await web3.eth.net.getId();
      this.initRequestProvider(web3, networkId);
    }
  }

  public fetchAccounts = async () => {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider);
      const { currentAccount } = this.state;
      const account = await web3.eth.getAccounts();
      if (account.length > 0 && currentAccount === '') {
        return this.setState({ currentAccount: account[0] });
      }
      if (currentAccount !== account[0]) {
        return this.setState({ currentAccount: account[0] });
      }
    }
  };

  public componentDidMount() {
    this.initWeb3();
    this.initPoll();
  }

  public componentDidUpdate({ onInit }, prevState) {
    if (prevState.requestNetwork === undefined && this.state.requestNetwork) {
      onInit();
    }
  }

  public render() {
    const { requestNetwork, currentNetwork, currentAccount } = this.state;
    if (!requestNetwork) {
      return null;
    }

    return (
      <Provider
        value={{
          create: (paymentAddress: [string], amounts: [string], data: any) =>
            createRequest(requestNetwork, paymentAddress, amounts, data, {
              currentAccount,
            }),
          get: id => getRequest(requestNetwork, id),
          pay: (requestId, amounts) =>
            payRequest(requestNetwork, requestId, amounts),
          isReady: true,
          currentNetwork,
          networkMismatch: !(NETWORK_NAME === currentNetwork),
          currentAccount,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default RequestNetworkProvider;
