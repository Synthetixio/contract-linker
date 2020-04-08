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

// additional
redirects.push('/ProtocolDAO https://etherscan.io/address/0xEb3107117FEAd7de89Cd14D463D340A2E6917769 302');
redirects.push('/Oracle https://etherscan.io/address/0xaC1ED4Fabbd5204E02950D68b6FC8c446AC95362 302');
redirects.push('/Deployer https://etherscan.io/address/0xDe910777C787903F78C89e7a0bf7F4C435cBB1Fe 302');
redirects.push('/Fee https://etherscan.io/address/0xfeEFEEfeefEeFeefEEFEEfEeFeefEEFeeFEEFEeF 302');
redirects.push('/Unipool https://etherscan.io/address/0x48D7f315feDcaD332F68aafa017c7C158BC54760 302');
redirects.push('/Curvepool https://etherscan.io/address/0x13B54E8271B3e45cE71D8f4fC73eA936873a34fC 302');
redirects.push('/KybersUSD https://etherscan.io/address/0x4Cb01bd05E4652CbB9F312aE604f4549D2bf2C99 302');
redirects.push('/KyberSNX https://etherscan.io/address/0xa107dfa919c3f084a7893A260b99586981beb528 302');
redirects.push('/KyberSNXPricing https://etherscan.io/address/0x0d8c194e877Af78Bea7D1A7b00f593AeEd7Be709 302');
redirects.push('/ArbRewarder https://etherscan.io/address/0xA6B5E74466eDc95D0b6e65c5CBFcA0a676d893a4 302');

fs.writeFileSync(redirectsFile, redirects.join('\n') + '\n');

['index.html', 'favicon.ico'].forEach(filename =>
	fs.copyFileSync(path.join(__dirname, 'public', filename), path.join(outputFolder, filename)),
);

// Get the SNX version
const { version: snxVersion } = JSON.parse(fs.readFileSync(path.join('node_modules', 'synthetix', 'package.json')));

// Add the last updated part
const indexFilePath = path.join(outputFolder, 'index.html');
let indexFile = fs.readFileSync(indexFilePath).toString();
indexFile = indexFile.replace(
	'::last-updated::',
	`<strong><a href="https://github.com/Synthetixio/synthetix/tree/v${snxVersion}" target="_blank">v${snxVersion}</a></strong> (${new Date()})`,
);
fs.writeFileSync(indexFilePath, indexFile);
