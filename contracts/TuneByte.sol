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
    
    uint256 public totalShares = 0;
    uint256 public totalReleased = 0;
    
    function addPayee(address[] _payees, uint256[] _shares) public {
      
        payees = _payees;
        for (uint i=0; i<_payees.length; i++) {
          shares[_payees[i]] = _shares[i];
        }
    }

    function pay(uint amount) public payable {
    
        address payer = msg.sender;

        // uint256 totalReceived = address(this).balance.add(totalReleased);
        // uint256 payment = totalReceived.mul(
        //   shares[payer]).div(totalShares);

        // totalReleased = totalReleased.add(payment);

        // payer.transfer(payment);
    }

    function getPayees() view public returns (address[]) {
        return payees;
    }


    function getShares(address payee) view public returns (uint256) {
        return shares[payee];
    }


}

