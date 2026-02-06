async function main() {
  const Contract = await ethers.getContractFactory('DailyOrganizerLog');
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  console.log('DailyOrganizerLog deployed at:', await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
