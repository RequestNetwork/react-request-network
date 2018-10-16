import EthereumTx from "ethereumjs-tx";
const Contract = require("web3-eth-contract");
import { getArtifact } from "./utils";

const artifact = getArtifact();

const contract = new Contract(artifact.abi);

const refund = "0x4b7b1cbbd739a2a0e95b32b64fd3d249c671bd44";

export const create = (
  paymentAddress: string,
  amount: string,
  ipfsHash: any
) => {
  const txData = contract.methods.createRequestAsPayee(
    [paymentAddress],
    [amount],
    refund,
    [0],
    [0],
    ipfsHash
  );

  const txParams = {
    nonce: "0x00",
    //    gasPrice: "0x09184e72a000",
    //    gasLimit: "0x2710",
    to: artifact.networks.private.address,
    //    value: "0x00",
    data: txData.encodeABI()
    //    chainId: 3
  };

  const tx = new EthereumTx(txParams);
  return tx;
};
