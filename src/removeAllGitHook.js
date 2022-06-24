const path = require('path');
const chalk = require('chalk');
const doesDirectoryExist = require('./doesDirectoryExist');
const executeCommand = require('./executeCommand');

const removeAllGitHook = async () => {
	const dotHuskyDir = path.join(process.cwd(), '.husky');
	if (!doesDirectoryExist(dotHuskyDir)) return;
	console.log(chalk.gray.bold(`> Removing \`.husky\` directory from root`));
	await executeCommand(`git config --unset core.hooksPath`);
	await executeCommand(`rm -rf .husky`);
};

module.exports = removeAllGitHook;
