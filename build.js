'use strict';

const fs = require('fs');
const path = require('path');

const snx = require('synthetix');

// Create the _redirects file
const outputFolder = path.join(__dirname, 'build');
if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder);
}

const getExplorerLinkPrefix = ({ network, useOvm }) => {
	return `https://${network !== 'mainnet' ? network + (useOvm ? '-' : '.') : ''}${
		useOvm ? 'explorer.optimism' : 'etherscan'
	}.io`;
};

const redirectsFile = path.join(outputFolder, '_redirects');

const redirects = [];

['mainnet', 'mainnet-ovm', 'kovan', 'kovan-ovm'].forEach(label => {
	const [network, useOvm] = label.split('-');
	const targets = snx.getTarget({ network, useOvm });
	let additional = [];
	if (network === 'mainnet' && useOvm) {
		additional = [
			{ name: 'WETHWrapper', address: '0x6202a3b0be1d222971e93aab084c6e584c29db70' },
			{ name: 'DAIWrapper', address: '0xad32aa4bff8b61b4ae07e3ba437cf81100af0cd7' },
			{ name: 'LUSDWrapper', address: '0x8a91e92fdd86e734781c38db52a390e1b99fba7c' },
		];
	} else if (network === 'mainnet') {
		additional = [
			{ name: 'ProtocolDAO', address: '0xEb3107117FEAd7de89Cd14D463D340A2E6917769' },
			{ name: 'GrantsDAOV2Contract', address: '0x4cf117aaa757dad4a084025c3f23f1b67a037049' },
			{ name: 'GrantsDAO', address: '0xeb9a82736cc030fC4A4CD4b53e9B2c67e153208d' },
			{ name: 'AmbassadorDAO', address: '0x46abFE1C972fCa43766d6aD70E1c1Df72F4Bb4d1' },
			{ name: 'Oracle', address: '0xaC1ED4Fabbd5204E02950D68b6FC8c446AC95362' },
			{ name: 'Deployer', address: '0xDe910777C787903F78C89e7a0bf7F4C435cBB1Fe' },
			{ name: 'Fee', address: '0xfeEFEEfeefEeFeefEEFEEfEeFeefEEFeeFEEFEeF' },
			{ name: 'ArbRewarder', address: '0xA6B5E74466eDc95D0b6e65c5CBFcA0a676d893a4' },
			{ name: 'SnapshotKeeper', address: '0xAC63b3A69604925DADf2AbD13877d7a4A7113308' },
			{ name: 'MarketCloser', address: '0xC105Ea57Eb434Fbe44690d7Dec2702e4a2FBFCf7' },

			// Third party
			{ name: 'KybersUSD', address: '0x4Cb01bd05E4652CbB9F312aE604f4549D2bf2C99' },
			{ name: 'KyberSNX', address: '0xa107dfa919c3f084a7893A260b99586981beb528' },
			{ name: 'KyberSNXPricing', address: '0x0d8c194e877Af78Bea7D1A7b00f593AeEd7Be709' },
			{ name: 'BalancerSNXUSDC', address: '0x815F8eF4863451f4Faf34FBc860034812E7377d9' },
			{ name: 'BalancerSNXREN', address: '0x330416C863f2acCE7aF9C9314B422d24c672534a' },
			{ name: 'OldCouncilDilution', address: '0x30Ba359FE295E311D24BcCb1502c7a6e89Fb2100' },
			{ name: 'CouncilDilution', address: '0xFf4e21298E5DCE1398d6fc9857098Eae3cAF1e72' },
			{ name: 'SpartanCouncilNFT', address: '0x023c66b7e13d30a3c46aa433fd2829763d5817c5' },
		];
	}
	for (const { name, address } of Object.values(targets).concat(additional)) {
		redirects.push(
			`${network !== 'mainnet' ? `/${network}` : ''}${useOvm ? '/ovm' : ''}/${name} ${getExplorerLinkPrefix({
				network,
				useOvm,
			})}/address/${address} 302`,
		);
	}
});

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
