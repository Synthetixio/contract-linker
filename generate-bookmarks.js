'use strict';

const fs = require('fs');
const path = require('path');

const snx = require('synthetix');

const bookmarks = ['mainnet', 'goerli', 'rinkeby', 'ropsten'].reduce((memo, network) => {
	const bookmarksForNetwork = Object.keys(snx.getTarget({ network }));

	const networkNameForInsertion = network === 'mainnet' ? '' : network;

	return memo.concat(
		bookmarksForNetwork.map(
			contractName =>
				`<DT><A HREF="https://contracts.synthetix.io/${
					networkNameForInsertion ? networkNameForInsertion + '/' : ''
				}${contractName}">SNX ${
					networkNameForInsertion ? networkNameForInsertion + ' ' : ''
				}${contractName} contract redirect</A></DT>`,
		),
	);
}, []);

console.log(`
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>SNX Contract Redirect Bookmarks</TITLE>
<H1>SNX Contract Redirect Bookmarks</H1>
<DL>
  ${bookmarks.join('\n')}
</DL>
`);
