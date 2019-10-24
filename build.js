'use strict';

const fs = require('fs');
const path = require('path');

const snx = require('synthetix');

// Create the _redirects file
const outputFolder = path.join(__dirname, 'build');
if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder);
}

const redirectsFile = path.join(outputFolder, '_redirects');

const redirects = [];

['mainnet', 'kovan', 'rinkeby', 'ropsten'].forEach(network => {
	const targets = snx.getTarget({ network });
	for (const { name, address } of Object.values(targets)) {
		redirects.push(
			`/${network !== 'mainnet' ? network + '/' : ''}${name} https://${
				network !== 'mainnet' ? network + '.' : ''
			}etherscan.io/address/${address} 302`,
		);
	}
});
fs.writeFileSync(redirectsFile, redirects.join('\n') + '\n');

['index.html', 'favicon.ico'].forEach(filename =>
	fs.copyFileSync(path.join(__dirname, 'public', filename), path.join(outputFolder, filename)),
);
