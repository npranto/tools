const chalk = require('chalk');
const executeCommand = require('./executeCommand');
const getPackageJSON = require('./getPackageJSON');
const isPackageInstalled = require('./isPackageInstalled');

const installPackage = async (pkg, version, asDevDependency) => {
	const packageJSON = getPackageJSON();
	if (isPackageInstalled(pkg, packageJSON)) {
		console.log(
			chalk.grey.bold(`(ℹ) Looks like (${pkg}) is installed already, skipping`),
		);
		return;
	}
	console.log(
		chalk.gray.bold(
			`> Installing version (${version || 'latest'}) of (${pkg})...`,
		),
	);
	const name = version ? `${pkg}@${version}` : `${pkg}`;
	const devDependencyFlag = asDevDependency ? '-D' : '';
	await executeCommand(`npm install ${name} ${devDependencyFlag}`);
};

module.exports = installPackage;
