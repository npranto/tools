const path = require('path');
const process = require('process');
const doesDirectoryExist = require('./doesDirectoryExist');

const isGitInitialized = () =>
	doesDirectoryExist(path.join(process.cwd(), '.git'));

module.exports = isGitInitialized;
