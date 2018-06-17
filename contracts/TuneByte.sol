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

    mapping(address => uint256) public shares;
    address[] public payees;
    
      function addPayee(address _payee, uint256 _shares) public {
    
        payees.push(_payee);
        shares[_payee] = _shares;
        
      }


}

