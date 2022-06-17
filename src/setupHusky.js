const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const process = require('process');
const { exec } = require('child_process');

// path.exists('foo.txt', function (exists) {
// 	if (exists) {
// 		// do something
// 	}
// });

// // or

// if (path.existsSync('foo.txt')) {
// 	// do something
// }

const doesDirectoryExist = (dir) => {
	try {
		return fs.existsSync(dir);
	} catch (e) {
		return false;
	}
};

const executeCommand = (command) => {
	return new Promise((resolve) => {
		exec(`${command}`, (error, stdout, stderr) => {
			if (error) {
				resolve({
					success: false,
				});
			}
			if (stderr) {
				resolve({
					success: false,
				});
			}
			resolve({
				success: true,
				output: stdout,
			});
		});
	});
};

const getPackageJSON = () => {
	const filePath = path.join(process.cwd(), 'package.json');
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	} catch (e) {
		throw e;
	}
};

const isPackageInstalled = (package = '', packageJSON = {}) => {
	const { dependencies = {}, devDependencies = {} } = packageJSON;
	return dependencies[package] || devDependencies[package];
};

const installPackage = async (package, version, asDevDependency) => {
	const packageJSON = getPackageJSON();
	if (isPackageInstalled(package, packageJSON)) {
		console.log(
			chalk.green.bold(
				`Looks like (${package}) is installed already, skipping installation`
			)
		);
		return;
	}
	console.log(
		chalk.gray(
			`Installing version (${version ? version : 'latest'}) of (${package})...`
		)
	);
	const name = version ? `${package}@${version}` : `${package}`;
	const devDependencyFlag = asDevDependency ? '-D' : '';
	await executeCommand(`npm install ${name} ${devDependencyFlag}`);
	console.log(chalk.green.bold('DONE'));
};

const isGitInitialized = () => {
	return doesDirectoryExist(path.join(process.cwd(), '.git'));
};

const initializeGit = async () => {
	if (isGitInitialized()) {
		console.log(
			chalk.green.bold(`Looks like \`git\` is already initialized, skipping`)
		);
	} else {
		console.log(chalk.gray('Initializing git...'));
		await executeCommand('git init');
		console.log(chalk.green.bold('DONE'));
	}
};

const addAllGitHook = () => {
	// TODO:
};

const setupHusky = async () => {
	const currentDir = process.cwd();
	console.log({ currentDir });

	await installPackage('husky', null, true);

	await initializeGit();

	const { success } = executeCommand('npx husky install');

	await addAllGitHook();

	return;

	// - npm install husky --save-dev
	// - git init
	// - npx husky install
	// - npx husky add .husky/pre-commit ""
	// - git add .husky/pre-commit

	if (!fs.existsSync(currentDir)) {
		console.log(chalk.red.bold(''));
	}
};

module.exports = setupHusky;
