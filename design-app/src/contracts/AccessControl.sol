// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {
    mapping(string => mapping(address => bool)) public access;
    address public owner;

    constructor() { owner = msg.sender; }

    function grantAccess(string calldata cid, address user) external {
        require(msg.sender == owner, "Only owner can grant");
        access[cid][user] = true;
    }

    function hasAccess(string calldata cid, address user) external view returns (bool) {
        return access[cid][user];
    }
}
