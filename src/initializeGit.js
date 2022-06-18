const chalk = require('chalk');
const executeCommand = require('./executeCommand');
const isGitInitialized = require('./isGitInitialized');

const initializeGit = async () => {
	if (isGitInitialized()) {
		console.log(
			chalk.gray.bold(`(ℹ) Looks like \`git\` is already initialized, skipping`)
		);
	} else {
		console.log(chalk.gray('> Initializing git...'));
		await executeCommand('git init');
	}
};

module.exports = initializeGit;
