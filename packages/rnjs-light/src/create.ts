const Contract = require("web3-eth-contract");
import { getArtifact } from "./helpers";
import { utils } from "ethers";

// for now only work with private networks
const artifact = getArtifact();
const contract = new Contract(artifact.abi);

export interface ICreate {
  beneficiary: string;
  amount: string;
  ipfsHash: string;
  payer: string;
}

export const create = ({ beneficiary, amount, payer, ipfsHash }: ICreate) => {
  // as the beneficiary
  const txData = contract.methods.createRequestAsPayer(
    [beneficiary],
    [amount],
    payer,
    [0],
    [0],
    ipfsHash
  );

  const txParams = {
    to: artifact.networks.private.address,
    data: txData.encodeABI()
  };
  return utils.serializeTransaction(txParams);
};
