const chalk = require('chalk');
const addAllGitHook = require('./addAllGitHook');
const executeCommand = require('./executeCommand');
const initializeGit = require('./initializeGit');
const installPackage = require('./installPackage');
const removeAllGitHook = require('./removeAllGitHook');
const removePackage = require('./removePackage');

const setupHusky = async () => {
	console.log(chalk.green.bold('👉 Setting up husky...'));
	await installPackage('husky', '8.0.1', true);
	await initializeGit();
	await executeCommand('npx husky install');
	await addAllGitHook();
	console.log(chalk.green.bold('✅ Success! Husky is setup now!'));
};

const removeHusky = async () => {
	console.log(chalk.green.bold('👉 Removing husky...'));
	await removePackage('husky');
	await removeAllGitHook();
	console.log(chalk.green.bold('✅ Success! Husky has been removed!'));
};

const onHusky = (options = {}) => {
	const { remove = false  } = options;
	if (remove) removeHusky();
	else setupHusky();
};

module.exports = onHusky;
