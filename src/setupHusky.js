const chalk = require('chalk');
const addAllGitHook = require('./addAllGitHook');
const executeCommand = require('./executeCommand');
const initializeGit = require('./initializeGit');
const installPackage = require('./installPackage');

const setupHusky = async () => {
	console.log(chalk.green.bold('👉 Setting up husky...'));
	await installPackage('husky', '8.0.1', true);
	await initializeGit();
	await executeCommand('npx husky install');
	await addAllGitHook();
	console.log(chalk.green.bold('✅ Success! Husky is setup now!'));
};

module.exports = setupHusky;
