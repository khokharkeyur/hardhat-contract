// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MappingContract {
    mapping(uint256 => string) public names;
    mapping(uint256 => Book) public books;
    mapping (address => mapping(uint => Book)) public myBooks;

    struct Book {
        string title;
        string author;
    }

    constructor() {
        names[1] = "Adem";
        names[2] = "jay";
        names[3] = "vijay";
    }

    function addBooks(
        uint256 _id,
        string memory _title,
        string memory _author
    ) public {
        books[_id] = Book(_title, _author);
    }
    function addMyBooks(
        uint256 _id,
        string memory _title,
        string memory _author
    ) public {
        myBooks[msg.sender][_id] = Book(_title, _author);
    }
}
