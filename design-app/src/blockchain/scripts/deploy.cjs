const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();
  
  // Choose the desired account, for example, the second account
  const deployer = signers[7];

  console.log("Deploying from:", await deployer.getAddress());

  const Factory = await hre.ethers.getContractFactory("AccessControl", deployer);
  const contract = await Factory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ AccessControl deployed to:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
