import { create } from "../src";
const add = (n1, n2) => {
  return n1 + n2;
};

describe("create a request", () => {
  it("should contain a create function", () => {
    expect(typeof create).toEqual("function");
  });
  it("should create a valid transaction", () => {
    const paymentAddress = "0x0e8d9cb9e11278ad6e2ba1ca90385c7295dc6532";
    const amount = "100000000000000000000000000000000";
    const data = {};
    expect(create(paymentAddress, amount, data)).toMatchSnapshot();
  });
  it("should get the latest nonce", () => {});
});
