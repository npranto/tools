const path = require('path');
const chalk = require('chalk');
const installPackage = require('./installPackage');
const doesFileExist = require('./doesFileExist');
const getPackageJSON = require('./getPackageJSON');
const writeToFile = require('./writeToFile');

const DEFAULT_PRETTIER_CONFIG = {
	trailingComma: 'all',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
};
const DEFAULT_PRETTIER_IGNORE = ['build', 'dist', 'node_modules', 'README.md'];

async function addDefaultPrettierConfig() {
	const prettierrcFilePath = path.join(process.cwd(), '.prettierrc');
	if (doesFileExist(prettierrcFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.prettierrc\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Adding \`.prettierrc\` file...`));
	writeToFile(
		path.join(process.cwd(), '.prettierrc'),
		JSON.stringify(DEFAULT_PRETTIER_CONFIG, null, 2),
	);
}

async function addDefaultPrettierIgnore() {
	const prettierIgnoreFilePath = path.join(process.cwd(), '.prettierignore');
	if (doesFileExist(prettierIgnoreFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.prettierignore\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Adding \`.prettierignore\` file...`));
	writeToFile(
		path.join(process.cwd(), '.prettierignore'),
		DEFAULT_PRETTIER_IGNORE.join('\n'),
	);
}

async function addFormatScript() {
	const packageJSON = getPackageJSON();
	const { scripts = {} } = packageJSON;
	const packageJSONFilePath = path.join(process.cwd(), 'package.json');

	if (
		scripts.format &&
		typeof scripts.format === 'string' &&
		scripts.format?.length
	) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`format\` script already exists, skipping`,
			),
		);
		return;
	}

	console.log(
		chalk.gray(`> Adding \`format\` script inside \`package.json\`...`),
	);

	const updatedPkgJSON = {
		...packageJSON,
		scripts: {
			...scripts,
			format: 'npx prettier --write .',
		},
	};

	writeToFile(packageJSONFilePath, JSON.stringify(updatedPkgJSON, null, 2));
}

const setupPrettier = async () => {
	console.log(chalk.green.bold('👉 Setting up prettier...'));
	await installPackage('prettier', '2.7.1', true);
	await addDefaultPrettierConfig();
	await addDefaultPrettierIgnore();
	await addFormatScript();
	console.log(chalk.green.bold('✅ Success! Prettier is setup now!'));
};

module.exports = setupPrettier;
