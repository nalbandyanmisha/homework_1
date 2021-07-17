pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20("Test Token", "TT") {
    constructor(address _holder) {
        _mint(_holder, 1000 ether);
    }
}