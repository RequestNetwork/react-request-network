import { utils } from "ethers";

export const sign = async (tx: string, wallet) => {
  const parsedTx = await utils.parseTransaction(tx);
  const signedTx = wallet.sign(parsedTx);
  return signedTx;
};
