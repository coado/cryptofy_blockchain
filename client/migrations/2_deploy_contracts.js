const PaymentsContract = artifacts.require("PaymentsContract");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(PaymentsContract);
};
