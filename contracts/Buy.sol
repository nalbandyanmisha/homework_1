pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Buy {
    IERC20 private token;
    uint8 public price;
    address private owner;

    event Sold(uint256 _amount);
    event Bought(uint256 _amount);

    constructor(address _token) {

        token = IERC20(_token);
        price = 1;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call that function");
        _;
    }

    function buyToken() external payable {
        uint256 amountToBuy = msg.value;
        uint256 contractBalance = token.balanceOf(address(this));
        require(amountToBuy > 0, "You need to send some ether");
        require(amountToBuy <= contractBalance, "Not enough tokens in contract balance");
        token.transfer(msg.sender, amountToBuy);
        emit Bought(amountToBuy);
    }

    function sellToken(uint256 _amount) public {
        require(_amount > 0, "You need to sell at least to some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(_amount);
        emit Sold(_amount);
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount * price, "Buy::Have not enough balance");
        payable(msg.sender).transfer(_amount);
    }
}