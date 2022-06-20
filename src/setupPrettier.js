const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
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

function addCustomPrettierConfig() {
	const prettierrcFilePath = path.join(process.cwd(), '.prettierrc');
	if (doesFileExist(prettierrcFilePath)) {
		console.log(
			chalk.gray.bold(
				`(ℹ) Looks like \`.prettierrc\` file already exists, skipping`,
			),
		);
		return null;
	}
	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'printWidth',
				message: `${chalk.blue(
					'Print Width',
				)} (specify the line length that the printer will wrap on, i.e., 80)`,
				default() {
					return 80;
				},
				validate(value) {
					const numberRegex = /^\d+$/;
					if (numberRegex.test(value)) return true;
					return 'Please enter a numeric value, i.e., 80 or 120';
				},
				filter(value) {
					return Number(value);
				},
			},
			{
				type: 'list',
				name: 'tabWidth',
				message: `${chalk.blue(
					'Tab Width',
				)} (specify the number of spaces per indentation-level)`,
				choices: [
					{
						key: '2',
						name: '2 (spaces)',
						value: '2',
					},
					{
						key: '4',
						name: '4 (spaces)',
						value: '4',
					},
				],
				filter(value) {
					return Number(value);
				},
			},
			{
				type: 'confirm',
				name: 'useTabs',
				message: `${chalk.blue.bold(
					'Tabs',
				)} (indent lines with tabs instead of spaces)`,
				default() {
					return false;
				},
			},
			{
				type: 'confirm',
				name: 'semi',
				message: `${chalk.blue.bold(
					'Semicolons',
				)} (print semicolons at the ends of statements)`,
				default() {
					return true;
				},
			},
			{
				type: 'confirm',
				name: 'singleQuote',
				message: `${chalk.blue.bold(
					'Quotes',
				)} (use single quotes instead of double quotes)`,
				default() {
					return false;
				},
			},
			{
				type: 'list',
				name: 'quoteProps',
				message: `${chalk.blue.bold(
					'Quote Props',
				)} (change when properties in objects are quoted)`,
				choices: [
					{
						name: '"as-needed" (default) - Only add quotes around object properties where required',
						value: 'as-needed',
					},
					{
						name: '"consistent" - If at least one property in an object requires quotes, quote all properties',
						value: 'consistent',
					},
					{
						name: '"preserve" - Respect the input use of quotes in object properties',
						value: 'preserve',
					},
				],
			},
			{
				type: 'confirm',
				name: 'jsxSingleQuote',
				message: `${chalk.blue.bold(
					'JSX Quotes',
				)} (use single quotes instead of double quotes in JSX)`,
				default() {
					return false;
				},
			},
			{
				type: 'list',
				name: 'trailingComma',
				message: `${chalk.blue.bold(
					'Trailing Commas',
				)} (print trailing commas wherever possible in multi-line comma-separated syntactic structures)`,
				choices: [
					{
						name: '"es5" - Trailing commas where valid in ES5 (objects, arrays, etc.). No trailing commas in type parameters in TypeScript.',
						value: 'es5',
					},
					{
						name: '"none" - No trailing commas.',
						value: 'none',
					},
					{
						name: '"all" - Trailing commas wherever possible',
						value: 'all',
					},
				],
			},
			{
				type: 'confirm',
				name: 'bracketSpacing',
				message: `${chalk.blue.bold(
					'Bracket Spacing',
				)} (print spaces between brackets in object literals)`,
				choices: [
					{
						name: 'true - Example: { foo: bar }',
						value: true,
					},
					{
						name: 'false - Example: {foo: bar}',
						value: false,
					},
				],
			},
			{
				type: 'confirm',
				name: 'bracketSameLine',
				message: `${chalk.blue.bold(
					'Bracket Line',
				)} (put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements))`,
				default() {
					return false;
				},
			},
			{
				type: 'confirm',
				name: 'arrowParens',
				message: `${chalk.blue.bold(
					'Arrow Function Parentheses',
				)} (include parentheses around a sole arrow function parameter)`,
				choices: [
					{
						name: '"always" - Always include parens. Example: (x) => x',
						value: 'always',
					},
					{
						name: '"avoid" - Omit parens when possible. Example: x => x',
						value: 'avoid',
					},
				],
			},
			{
				type: 'confirm',
				name: 'singleAttributePerLine',
				message: `${chalk.blue.bold(
					'Single Attribute Per Line',
				)} (enforce single attribute per line in HTML, Vue and JSX)`,
				choices: [
					{
						name: 'false - Do not enforce single attribute per line',
						value: false,
					},
					{
						name: 'true - Enforce single attribute per line',
						value: true,
					},
				],
			},
		])
		.then((customPrettierConfig) => {
			console.log(chalk.gray(`> Adding \`.prettierrc\` file...`));
			writeToFile(
				path.join(process.cwd(), '.prettierrc'),
				JSON.stringify(customPrettierConfig, null, 2),
			);
		})
		.catch((error) => {
			throw error;
		});
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

async function setupPrettierDefault() {
	await installPackage('prettier', '2.7.1', true);
	await addDefaultPrettierConfig();
	await addDefaultPrettierIgnore();
	await addFormatScript();
}

async function setupPrettierCustom() {
	await installPackage('prettier', '2.7.1', true);
	await addCustomPrettierConfig();
	await addDefaultPrettierIgnore();
	await addFormatScript();
}

const setupPrettier = async (options = {}) => {
	const { custom = false } = options;
	console.log(chalk.green.bold('👉 Setting up prettier...'));
	if (custom) {
		await setupPrettierCustom();
	} else {
		await setupPrettierDefault();
	}
	console.log(chalk.green.bold('✅ Success! Prettier is setup now!'));
};

module.exports = setupPrettier;
