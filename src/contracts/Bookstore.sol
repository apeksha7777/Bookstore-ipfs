pragma solidity ^0.5.0;

contract Bookstore {
    event bookPublished (uint256 bookId, address publisher, uint256 amount);
    event bookPurchased (uint256 bookId, address buyer, uint256 amount);
    struct Book {
        string bookName;
        bytes32 bookHash;
        bytes32 coverHash;
        bytes32 descriptionHash;
        uint256 amount;
        address payable bookOwner;
    }
     mapping (uint256 => Book) BookList;
     uint bookId=0;
     function store(string memory _bookName, bytes32 _bookHash, bytes32 _coverHash, bytes32 _descriptionHash, uint256 _amount) public {
        BookList[bookId++] = Book(_bookName, _bookHash, _coverHash, _descriptionHash, _amount, msg.sender);
    }
    function retreive(uint256 _bookId) public view returns (string memory, bytes32, bytes32, bytes32, uint256, address) {
        Book storage c = BookList[_bookId];
        return (c.bookName, c.bookHash, c.coverHash, c.descriptionHash, c.amount, c.bookOwner);
    }
    function totalBooks() public view returns(uint256) {
        return (bookId);
    }
    function Purchase (uint256 _bookId) public payable {
      Book storage Books = BookList[_bookId];
      require (msg.value >= Books.amount, "Check the book amount");
      Books.bookOwner.transfer(Books.amount);
      emit bookPurchased(_bookId, msg.sender, Books.amount);
    }
  }