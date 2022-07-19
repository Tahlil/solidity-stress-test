// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

// Import this file to use console.log
import "hardhat/console.sol";

contract Oracle {
    address private _owner;
    struct Match{
        string homeTeam;
        string awayTeam;
        uint8 homeGoal;
        uint8 awayGoal;
        string[] goalScorers;
        uint8[] numberOfGoalsScored;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not an owner");
        _;
    }
    
/*
* @author Tahlil
* @dev string -> <LeagueName>-<YYYY> (YYYY -> season i. e. for 2019-2020 session - session=2019)
*/
    mapping (string=>Match[]) private _matches;

    constructor() {
        _owner = msg.sender;
    }
    
    function getMatch(string memory league) public view returns(Match[] memory){
        return _matches[league];
    }

}
