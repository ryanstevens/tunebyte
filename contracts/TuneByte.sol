pragma solidity ^0.4.18;

contract TuneByte {

    constructor() public {
        storedData = 1000;
    }

    uint storedData;
    function get() public view returns (uint) {
      return storedData;
    }
    
}
