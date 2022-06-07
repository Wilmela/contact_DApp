//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Contacts{

    uint256 public contactCount;

    event Contact(string firstName, string lastName, uint256 phoneNumber, uint256 timestamp);

    struct _Contact{
        address sender;
        string firstName;
        string lastName;
        uint256 phoneNumber;
        uint256 timestamp;
    }

   _Contact[] public contacts;

   function addToBlockchain(string memory _firstName, string memory _lastName, uint256 _phoneNumber) public returns (bool success){
       contactCount++;

       contacts.push(_Contact(msg.sender, _firstName, _lastName, _phoneNumber, block.timestamp));

       emit Contact(_firstName, _lastName, _phoneNumber, block.timestamp);

       return true;
   }


   function getAllContacts() public view returns (_Contact[] memory){
       return contacts;
   }

    function getContactCount() public view returns(uint256) {
        return contactCount;
    }

}