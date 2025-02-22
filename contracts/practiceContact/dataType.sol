// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataTypeContract {
    uint public myUint = 1;
    uint8 public myUint8 = 1;
    uint256 public myUint256 = 1;
    string public myString = "myString";

    bytes32 public myBytes32 = "myBytes32";

    address public myAddress = 0xeCA0442f8d4e368f0882aCA0D75796A165521Aa6;

    struct MyStuct {
        uint256 myUint256;
        string myString;
    }

    MyStuct public myStuct = MyStuct(1,"hello");

    function getValue() public pure returns(uint)  {
        uint value = 1;
        return value;
    }
}