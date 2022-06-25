const path = require('path');
const process = require('process');
const chalk = require('chalk');
const { copySync } = require('fs-extra');
const doesFileExist = require('./doesFileExist');

const addBumpVersionWorkflow = async () => {
	console.log(chalk.green.bold('👉 Setting up "Bump Version" workflow...'));
	const bumpVersionFilePath = path.join(
		process.cwd(),
		'.github',
		'workflows',
		'bump-version.yml',
	);
	if (doesFileExist(bumpVersionFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.github/workflows/bump-version.yml\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(
		chalk.gray(`> Adding \`.github/workflows/bump-version.yml\` file...`),
	);
	copySync(
		path.join(process.cwd(), 'content/bump-version.yml'),
		path.join(process.cwd(), '.github/workflows/bump-version.yml'),
	);
	console.log(
		chalk.green.bold('✅ Success! "Bump Version" workflow is setup now!'),
	);
};

const onGitHubActions = (options = {}) => {
	console.log({ options });
	const { bumpVersion = false } = options;
	if (bumpVersion) addBumpVersionWorkflow();
	// else setupHusky();
};

module.exports = onGitHubActions;
