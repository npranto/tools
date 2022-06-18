const path = require('path');
const fs = require('fs');
const process = require('process');

const getPackageJSON = () => {
	const filePath = path.join(process.cwd(), 'package.json');
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};
module.exports = getPackageJSON;
