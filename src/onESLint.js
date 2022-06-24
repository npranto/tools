const path = require('path');
const chalk = require('chalk');
const installPackage = require('./installPackage');
const doesFileExist = require('./doesFileExist');
const getPackageJSON = require('./getPackageJSON');
const writeToFile = require('./writeToFile');
const removePackage = require('./removePackage');
const removeFile = require('./removeFile');

const DEFAULT_ESLINT_IGNORE = ['build', 'dist', 'node_modules', 'README.md'];

async function addCustomESlintConfig() {
	const eslintrcFilePath = path.join(process.cwd(), '.eslintrc');
	if (doesFileExist(eslintrcFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.eslintrc\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(chalk.blue.bold(`> Now, run \`npm init @eslint/config\``));
}

function addDefaultESLintIgnore() {
	const eslintIgnoreFilePath = path.join(process.cwd(), '.eslintignore');
	if (doesFileExist(eslintIgnoreFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.eslintignore\` file already exists, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Adding \`.eslintignore\` file...`));
	writeToFile(
		path.join(process.cwd(), '.eslintignore'),
		DEFAULT_ESLINT_IGNORE.join('\n'),
	);
}

function addLintScript() {
	const packageJSON = getPackageJSON();
	const { scripts = {} } = packageJSON;
	const packageJSONFilePath = path.join(process.cwd(), 'package.json');

	if (
		scripts.lint &&
		typeof scripts.lint === 'string' &&
		scripts.lint?.length
	) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`lint\` script already exists, skipping`,
			),
		);
		return;
	}

	console.log(
		chalk.gray(`> Adding \`lint\` script inside \`package.json\`...`),
	);

	const updatedPkgJSON = {
		...packageJSON,
		scripts: {
			...scripts,
			lint: 'npx eslint ./',
		},
	};

	writeToFile(packageJSONFilePath, JSON.stringify(updatedPkgJSON, null, 2));
}

async function removeLintScript() {
	const packageJSON = getPackageJSON();
	const { scripts = {} } = packageJSON;
	const packageJSONFilePath = path.join(process.cwd(), 'package.json');

	if (!scripts.lint) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`lint\` script does not exist, skipping`,
			),
		);
		return;
	}

	if (scripts?.lint !== 'npx eslint ./') {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`lint\` script has changed from default ESLint command, skipping`,
			),
		);
		return;
	}

	console.log(
		chalk.gray(`> Removing \`lint\` script from \`package.json\`...`),
	);

	const { lint, ...restScripts } = scripts;
	const updatedPkgJSON = {
		...packageJSON,
		scripts: {
			...restScripts,
		},
	};

	writeToFile(packageJSONFilePath, JSON.stringify(updatedPkgJSON, null, 2));
}

const removeESLintConfig = async () => {
	const eslintrcFilePath = path.join(process.cwd(), '.eslintrc');
	if (!doesFileExist(eslintrcFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.eslintrc\` file does not exist, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Removing \`.eslintrc\` file...`));
	await removeFile(path.join(process.cwd(), '.eslintrc'));
};

const removeESLintIgnore = async () => {
	const eslintIgnoreFilePath = path.join(process.cwd(), '.eslintignore');
	if (!doesFileExist(eslintIgnoreFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.eslintignore\` file does not exist, skipping`,
			),
		);
		return;
	}
	console.log(chalk.gray(`> Removing \`.eslintignore\` file...`));
	await removeFile(path.join(process.cwd(), '.eslintignore'));
};

async function setupESLintCustom() {
	console.log(
		chalk.green.bold('👉 Setting up eslint (w/ custom configurations)...'),
	);
	await installPackage('eslint', '8.7.0', true);
	await addDefaultESLintIgnore();
	await addLintScript();
	addCustomESlintConfig();
}

async function removeESLint() {
	console.log(chalk.green.bold('👉 Removing eslint...'));
	await removePackage('eslint');
	await removeESLintConfig();
	await removeESLintIgnore();
	await removeLintScript();
	console.log(chalk.green.bold('✅ Success! ESLint has been removed!'));
}

const onESLint = (options = {}) => {
	const { remove = false } = options;
	if (remove) removeESLint();
	else setupESLintCustom();
};

module.exports = onESLint;
