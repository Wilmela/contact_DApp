const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Contacts", () => {
  let Contract, contract;

  let firstName = "Mela";
  let lastName = "Wilson";
  let phoneNumber = 123456;
  let timestamp =  123456;

  let owner;
  let result;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("Contacts");
    contract = await Contract.deploy();

    result = await contract.addToBlockchain(firstName, lastName, phoneNumber.toString());
  });

  it("tracks contact count", async () => {
    console.log(owner.address);

    const contactCount = await contract.getContactCount();
    const contacts = await contract.getAllContacts();


    expect(contactCount).to.equal("1");
    expect(contacts.length).to.equal(1);
    expect(result).to.emit('Contact');

    expect(contacts[0].firstName).to.equal(firstName);
    expect(contacts[0].lastName).to.equal(lastName);
    expect(contacts[0].phoneNumber.toString()).to.equal(phoneNumber.toString());
  });

 

});
