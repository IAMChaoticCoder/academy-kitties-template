const Token = artifacts.require("Dogocontract");
const Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(Marketplace, Token.address);
};
