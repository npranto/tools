const isPackageInstalled = (pkg = '', packageJSON = {}) => {
	const { dependencies = {}, devDependencies = {} } = packageJSON;
	return dependencies[pkg] || devDependencies[pkg];
};

module.exports = isPackageInstalled;
