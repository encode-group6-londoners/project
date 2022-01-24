const hre = require("hardhat");
async function main() {
	// ethers is avaialble in the global scope
	const [deployer] = await hre.ethers.getSigners();
	console.log(
		"Deploying the contracts with the account:",
		await deployer.getAddress()
	);

	console.log("Account balance:", (await deployer.getBalance()).toString());

	const NiftyPassFactory = await hre.ethers.getContractFactory("NiftyPassFactory");
	const niftyPassFactory = await NiftyPassFactory.deploy();
	await niftyPassFactory.deployed();

	console.log("Address:", niftyPassFactory.address);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
