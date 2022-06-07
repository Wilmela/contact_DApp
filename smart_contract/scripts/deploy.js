const hre = require("hardhat");

const main = async () => {
  const Contacts = await hre.ethers.getContractFactory("Contacts");
  const contacts = await Contacts.deploy();

  await contacts.deployed();

  console.log("Contacts deployed to:", contacts.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
