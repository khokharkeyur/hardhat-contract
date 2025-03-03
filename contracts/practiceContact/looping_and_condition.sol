// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256[] public numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    address public owner =msg.sender;

    function countEvanNumber() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < numbers.length; i++) {
            bool isEvan = isEvenNumber(numbers[i]);
            if (isEvan) {
                count++;
            }
        }

        return count;
    }

    function isEvenNumber(uint256 _number) public view returns (bool) {
        if (_number % 2 == 0) {
            return true;
        } else {
            return false;
        }
    }

    function isOwner() public view returns (bool) {
        return (msg.sender == owner);
    }
}
