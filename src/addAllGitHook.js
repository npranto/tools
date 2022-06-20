const chalk = require('chalk');
const addGitHook = require('./addGitHook');

const addAllGitHook = async () => {
	console.log(
		chalk.gray.bold(
			`> Setting up following git hooks w/ husky: applypatch-msg, pre-push, commit-msg, pre-rebase, post-update, prepare-commit-msg, pre-applypatch, update, pre-commit`,
		),
	);
	await addGitHook('applypatch-msg');
	await addGitHook('pre-push');
	await addGitHook('commit-msg');
	await addGitHook('pre-rebase');
	await addGitHook('post-update');
	await addGitHook('prepare-commit-msg');
	await addGitHook('pre-applypatch');
	await addGitHook('update');
	await addGitHook('pre-commit');
};

module.exports = addAllGitHook;
