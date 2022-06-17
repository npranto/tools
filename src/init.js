const { program } = require('commander');
const setupHusky = require('./setupHusky');

program
	.command('setup-husky')
	.description(
		`
		Runs:
		 - npm install husky --save-dev
		 - git init
		 - npx husky install
		 - npx husky add .husky/pre-commit ""
		 - git add .husky/pre-commit

		Before You Run:
		 - ensure you are on the root of your project, otherwise husky may not setup properly
		`
	)
	.action(setupHusky);

program.parse();

// applypatch-msg.sample       pre-push.sample
// commit-msg.sample           pre-rebase.sample
// post-update.sample          prepare-commit-msg.sample
// pre-applypatch.sample       update.sample
// pre-commit.sample
