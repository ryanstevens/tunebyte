// pragma solidity ^0.4.18;

// contract TuneByte {

//     constructor() public {
//         storedData = 1000;
//     }

//     uint storedData;
//     function get() public view returns (uint) {
//       return storedData;
//     }
    
// }

pragma solidity ^0.4.18;

contract TuneByte {

    mapping(uint => Song) payment_template;

    struct Song{
      uint[] public_key;
      uint[] percents;
    }
    
    function tunebyte(uint _songId, uint[] _publicKeys, uint[] _percents) public {
        payment_template[_songId] = Song(_publicKeys, _percents);
    }

    
    function pay(uint _songId, uint _amount) payable public returns (uint[]) {
        Song temp = payment_template[_songId];
        uint[] myArray;
        uint total = 0;

        for(uint i=0; i < temp.percents.length; i++){
            total = total + temp.percents[i];
        }

        for(uint j=0; i < temp.percents.length; i++){
            myArray.push((temp.percents[i]/total) * _amount); 
        }
        
        return myArray;
    }
    
    function stringToBytes32(string memory _source) public returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(_source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly{
            result := mload(add(_source, 32))
        }
    }    
}

