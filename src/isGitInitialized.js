const path = require('path');
const process = require('process');
const doesDirectoryExist = require('./doesDirectoryExist');

const isGitInitialized = (p = process.cwd()) =>
	doesDirectoryExist(path.join(p, '.git'));

module.exports = isGitInitialized;
