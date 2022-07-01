const chalk = require('chalk');
const executeCommand = require('./executeCommand');
const isGitInitialized = require('./isGitInitialized');

const initializeGit = async ({ path } = {}) => {
	if (isGitInitialized(path)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`git\` is already initialized, skipping`,
			),
		);
	} else {
		console.log(chalk.gray('> Initializing git...'));
		await executeCommand('git init', { cwd: path });
	}
};

module.exports = initializeGit;
