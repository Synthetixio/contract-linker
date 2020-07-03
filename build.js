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
redirects.push('/ArbRewarder https://etherscan.io/address/0xA6B5E74466eDc95D0b6e65c5CBFcA0a676d893a4 302');

// Third party addresses
redirects.push('/KybersUSD https://etherscan.io/address/0x4Cb01bd05E4652CbB9F312aE604f4549D2bf2C99 302');
redirects.push('/KyberSNX https://etherscan.io/address/0xa107dfa919c3f084a7893A260b99586981beb528 302');
redirects.push('/KyberSNXPricing https://etherscan.io/address/0x0d8c194e877Af78Bea7D1A7b00f593AeEd7Be709 302');
redirects.push('/BalancerSNXUSDC https://etherscan.io/address/0x815F8eF4863451f4Faf34FBc860034812E7377d9 302');
redirects.push('/BalancerSNXREN https://etherscan.io/address/0x330416C863f2acCE7aF9C9314B422d24c672534a 302');

// LP rewards (legacy links)
redirects.push('/Unipool https://etherscan.io/address/0x48D7f315feDcaD332F68aafa017c7C158BC54760 302');
redirects.push('/CurveRewards https://etherscan.io/address/0xDCB6A51eA3CA5d3Fd898Fd6564757c7aAeC3ca92 302');
redirects.push('/iETHRewards https://etherscan.io/address/0xC746bc860781DC90BBFCD381d6A058Dc16357F8d 302');
// proper links (to remove after https://github.com/Synthetixio/synthetix/pull/523 is merged and a new version of
// the synthetix module is published)
redirects.push(
	'/StakingRewardssETHUniswapV1 https://etherscan.io/address/0x48D7f315feDcaD332F68aafa017c7C158BC54760 302',
);
redirects.push('/StakingRewardssUSDCurve https://etherscan.io/address/0xDCB6A51eA3CA5d3Fd898Fd6564757c7aAeC3ca92 302');
redirects.push(
	'/StakingRewardssXAUUniswapV2 https://etherscan.io/address/0x8302FE9F0C509a996573D3Cc5B0D5D51e4FDD5eC 302',
);
redirects.push('/StakingRewardsiETH https://etherscan.io/address/0xC746bc860781DC90BBFCD381d6A058Dc16357F8d 302');
redirects.push(
	'/StakingRewardsSNXBalancer https://etherscan.io/address/0xFBaEdde70732540cE2B11A8AC58Eb2dC0D69dE10 302',
);
redirects.push('/StakingRewardssBTCCurve https://etherscan.io/address/0x13C1542A468319688B89E323fe9A3Be3A90EBb27 302');

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
