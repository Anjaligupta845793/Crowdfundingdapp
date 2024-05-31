const fs = require("fs");
const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Crowdfunding");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();
   const file = artifacts.readArtifactSync("Crowdfunding");
   fs.mkdirSync( __dirname + "/../../client/src/abi",);
    fs.writeFileSync(__dirname + "/../../client/src/abi/address.json", JSON.stringify({address: transactionsContract.address},null,2));
    const abi =  JSON.stringify(file,null,2);
    fs.writeFileSync(__dirname + "/../../client/src/abi/abi.json",JSON.stringify(file,null,2) );
  
  
   
  

  console.log("Transactions address: ", transactionsContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();