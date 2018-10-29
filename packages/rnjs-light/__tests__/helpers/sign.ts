import { utils, Wallet } from "ethers";

export const sign = async (tx: string, wallet: Wallet) => {
  const parsedTx = await utils.parseTransaction(tx);
  const signedTx = wallet.sign(parsedTx);
  return signedTx;
};
