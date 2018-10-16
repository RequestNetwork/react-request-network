import { providers, utils } from "ethers";
export const broadcast = async (signedTx: string) => {
  const provider = new providers.JsonRpcProvider("http://localhost:8545");
  const parsedTx = utils.parseTransaction(signedTx);


  parsedTx.chainId = 1337;
  parsedTx.gasPrice = await provider.estimateGas(parsedTx);
  //  parsedTx.nonce = await provider.getTransactionCount(address);
  parsedTx.gasLimit = utils.bigNumberify("21000");

  return parsedTx;
};
