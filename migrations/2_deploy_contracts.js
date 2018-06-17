var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TuneByte = artifacts.require('./TuneByte.sol');

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TuneByte);
};
