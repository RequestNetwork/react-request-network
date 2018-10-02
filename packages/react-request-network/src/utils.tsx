export const createRequest = (
  requestNetwork: any,
  paymentAddress: string,
  amount: string,
  data,
  { currentAccount }: { currentAccount: string }
) =>
  requestNetwork.requestEthereumService.createRequestAsPayee(
    [currentAccount],
    [amount],
    '0x7d085bb0b1b2c99b42e3b17a4609311e4518208c', // aribtrary payer address
    [paymentAddress],
    undefined, // refund
    JSON.stringify(data),
    undefined, // extensions
    undefined, // extensionsParams
    { gasPrice: '15000000000' }
  );

export const getRequest = (requestNetwork, { hash }: { hash: string }) => {
  return requestNetwork.requestCoreService.getRequestByTransactionHash(hash);
};

export const payRequest = (requestNetwork, requestId, amount: string) =>
  requestNetwork.requestEthereumService.paymentAction(requestId, [amount]);
