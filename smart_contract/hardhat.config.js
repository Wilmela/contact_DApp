require("@nomiclabs/hardhat-waffle");

 const API_KEY = import.meta.env.VITE_ALCHEMY_API;
 const PRIVATE = import.meta.env.VITE_ALCHEMY_API_PRIVATE;

module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten:{
      url: `https://eth-ropsten.alchemyapi.io/v2/${PRIVATE}`,
      accounts:[`${API_KEY}`,]
    }
  }
};
