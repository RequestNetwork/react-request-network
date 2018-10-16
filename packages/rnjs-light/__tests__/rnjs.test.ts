import { create } from "../src";
import { utils, Wallet } from "ethers";
import { sign } from "./helpers/sign";
import { broadcast } from "./helpers/broadcast";

const beneficiary = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
const amount = "1000000000000000000000000";
const ipfsHash = "QmR4PjL9qszBAzdRivW59Am8hYRj2AkDkE7FQ3enzLiB7H";
const payer = "0x4b7b1cbbd739a2a0e95b32b64fd3d249c671bd44";

const privateKey = Buffer.from(
  "C87509A1C067BBDE78BEB793E6FA76530B6382A4C0241E5E4A9EC0A0F44DC0D3",
  "hex"
);

const wallet = new Wallet(privateKey);

describe("create a request", () => {
  it("should contain a create function", () => {
    expect(typeof create).toEqual("function");
  });
  it("should create a valid transaction", () => {
    const tx = create({ beneficiary, amount, ipfsHash, payer });
    expect(tx).toMatchSnapshot();
  });
});

describe("get a request", () => {
  it("should get a valid request", () => {});
});

describe("pay a request", () => {
  it("should pay the full amount of a request", () => {});
});

describe("e2e", () => {
  let tx: string;
  let signedTx: string;
  beforeAll(async () => {
    tx = create({ beneficiary, amount, ipfsHash, payer });
    // in real life use cases probably some rest api with some token linked to a specific user
    signedTx = await sign(tx, wallet);
  });
  it("should parse a signed transaction", async () => {
    const parsedTx = utils.parseTransaction(signedTx);
    expect(parsedTx).toMatchSnapshot();
  });
  it("should create a broadcastable transaction", async () => {
    const publicAddress = await wallet.getAddress();
    const broadcastableTx = await broadcast(signedTx, publicAddress);
    expect(broadcastableTx).toMatchSnapshot();
  });
});
