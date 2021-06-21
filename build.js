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

snx.networks
	.filter(network => network !== 'local')
	.forEach(network => {
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
redirects.push('/GrantsDAOV2Contract https://etherscan.io/address/0x4cf117aaa757dad4a084025c3f23f1b67a037049 302');
redirects.push('/GrantsDAO https://etherscan.io/address/0xeb9a82736cc030fC4A4CD4b53e9B2c67e153208d 302');
redirects.push('/AmbassadorDAO https://etherscan.io/address/0x46abFE1C972fCa43766d6aD70E1c1Df72F4Bb4d1 302');
redirects.push('/Oracle https://etherscan.io/address/0xaC1ED4Fabbd5204E02950D68b6FC8c446AC95362 302');
redirects.push('/Deployer https://etherscan.io/address/0xDe910777C787903F78C89e7a0bf7F4C435cBB1Fe 302');
redirects.push('/Fee https://etherscan.io/address/0xfeEFEEfeefEeFeefEEFEEfEeFeefEEFeeFEEFEeF 302');
redirects.push('/ArbRewarder https://etherscan.io/address/0xA6B5E74466eDc95D0b6e65c5CBFcA0a676d893a4 302');
redirects.push('/SnapshotKeeper https://etherscan.io/address/0xAC63b3A69604925DADf2AbD13877d7a4A7113308 302');
redirects.push('/MarketCloser https://etherscan.io/address/0xC105Ea57Eb434Fbe44690d7Dec2702e4a2FBFCf7 302');

// Third party addresses
redirects.push('/KybersUSD https://etherscan.io/address/0x4Cb01bd05E4652CbB9F312aE604f4549D2bf2C99 302');
redirects.push('/KyberSNX https://etherscan.io/address/0xa107dfa919c3f084a7893A260b99586981beb528 302');
redirects.push('/KyberSNXPricing https://etherscan.io/address/0x0d8c194e877Af78Bea7D1A7b00f593AeEd7Be709 302');
redirects.push('/BalancerSNXUSDC https://etherscan.io/address/0x815F8eF4863451f4Faf34FBc860034812E7377d9 302');
redirects.push('/BalancerSNXREN https://etherscan.io/address/0x330416C863f2acCE7aF9C9314B422d24c672534a 302');

redirects.push('/CouncilDilution https://etherscan.io/address/0x30Ba359FE295E311D24BcCb1502c7a6e89Fb2100 302');
redirects.push('/SpartanCouncilNFT https://etherscan.io/address/0x023c66b7e13d30a3c46aa433fd2829763d5817c5 302');

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
