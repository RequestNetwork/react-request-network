import requestArtifact from "requestnetworkartifacts";

const defaultNetwork = "private";
const defaultAddress = "last-RequestEthereum";

export const getArtifact = (
  network = defaultNetwork,
  address = defaultAddress
) => requestArtifact(network, address);
