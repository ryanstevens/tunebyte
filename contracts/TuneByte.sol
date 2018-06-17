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

    
      function addPayee(address _payee, uint256 _shares) public {
    
        payees.push(_payee);
        shares[_payee] = _shares;
        
      }

      function pay(uint amount) public payable {
      
        address payer = msg.sender;

        require(shares[payer] > 0);

        // uint256 totalReceived = address(this).balance.add(totalReleased);
        // uint256 payment = totalReceived.mul(
        //   shares[payer]).div(totalShares);

        // totalReleased = totalReleased.add(payment);

       // payer.transfer(payment);
      }

      function getPayees() view public returns (address[]) {
        return payees;
      }


}

