// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    address private owner;

    constructor() payable {
        owner = msg.sender;
    }

}
