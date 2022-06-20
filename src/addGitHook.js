const chalk = require('chalk');
const path = require('path');
const process = require('process');
const doesFileExist = require('./doesFileExist');
const executeCommand = require('./executeCommand');

const addGitHook = async (hook) => {
	if (!hook || typeof hook !== 'string') return;
	const gitHookPath = path.join(process.cwd(), '.husky', `${hook}`);
	if (doesFileExist(gitHookPath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`${hook}\` git hook is already setup, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Adding (${hook}) git hook...`));
	await executeCommand(`npx husky add .husky/${hook} ""`);
	await executeCommand(`git add .husky/${hook}`);
};

module.exports = addGitHook;
