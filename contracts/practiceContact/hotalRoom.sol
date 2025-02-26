// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HotalRoomContract {
    enum Statuses {
        Vacant,
        Occupied
    }
    Statuses public curruntStatus;
    event Occupy(address _occupant, uint256 _value);

    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
        curruntStatus = Statuses.Vacant;
    }

    modifier onlyWhilevacant() {
        require(curruntStatus == Statuses.Vacant, "Already occupied");
        _;
    }

    modifier costs(uint256 _amount) {
        require(msg.value >= _amount, "Not enough money");
        _;
    }

    function book() public payable onlyWhilevacant costs(2 ether) {
        curruntStatus = Statuses.Occupied;
        (bool sent, bytes memory data) = owner.call{value: msg.value}("");
        require(sent);

        emit Occupy(msg.sender, msg.value);
    }
}
