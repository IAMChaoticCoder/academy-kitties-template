const Token = artifacts.require("Dogocontract");

module.exports = function(deployer) {
  deployer.deploy(Token);
};
