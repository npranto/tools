const chalk = require('chalk');
const executeCommand = require('./executeCommand');
const getPackageJSON = require('./getPackageJSON');
const isPackageInstalled = require('./isPackageInstalled');

const removePackage = async (pkg) => {
	const packageJSON = getPackageJSON();
	if (!isPackageInstalled(pkg, packageJSON)) {
		console.log(
			chalk.grey.bold(`(ℹ) Looks like (${pkg}) is not installed, skipping`),
		);
		return;
	}
	console.log(chalk.gray.bold(`> Uninstalling (${pkg}) package...`));
	await executeCommand(`npm uninstall ${pkg}`);
};

module.exports = removePackage;
