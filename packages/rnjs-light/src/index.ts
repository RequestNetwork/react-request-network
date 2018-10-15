const EthereumTx = require("ethereumjs-tx");
const Contract = require("web3-eth-contract");
const { getArtifact } = require("./utils");
const ethers = require("ethers");

// example privateKey
const privateKey = Buffer.from(
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
  "hex"
);

const artifact = getArtifact();
const contractAddress = artifact.networks.private.address;
const abi = artifact.abi;

const contract = new Contract(artifact.abi);
const refund = "0x4b7b1cbbd739a2a0e95b32b64fd3d249c671bd44";


export const create = (
  paymentAddress: string,
  amount: string,
  ipfsHash: any
) => {
  const txData = contract.methods.createRequestAsPayer(
    [paymentAddress],
    [amount],
    refund,
    [0],
    [0],
    "random"
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
