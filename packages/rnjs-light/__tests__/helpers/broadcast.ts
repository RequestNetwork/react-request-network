import { providers, utils } from "ethers";
const provider = new providers.JsonRpcProvider("http://localhost:8545");

export const broadcast = async (signedTx: string, publicAddress: string) => {
  const parsedTx = utils.parseTransaction(signedTx);

  parsedTx.chainId = 1337;
  parsedTx.gasPrice = await provider.estimateGas(parsedTx);
  parsedTx.nonce = await provider.getTransactionCount(publicAddress);
  parsedTx.gasLimit = utils.bigNumberify("21000");

  return parsedTx;
};
