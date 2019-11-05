# SNX Contracts Auto Redirect

[![Netlify Status](https://api.netlify.com/api/v1/badges/295e6a34-6f46-442d-9902-93129e1cf921/deploy-status)](https://app.netlify.com/sites/synthetix-contracts/deploys)

This is the SNX auto redirection tool. It uses `HTTP 302` temporary redirects to redirect to the latest version of the Synthetix protocol contracts on Etherscan. It's here for conveninence for those who often deal with the contracts directly, and for linking to deployed contracts in blog posts, etc.

Please use `/ContractName` (case-sensitive) to auto-redirect to the latest contract version. E.g. https://contracts.synthetix.io/Synthetix links to the latest underlying.

For the full list of contract names, please [look at our developer docs](https://developer.synthetix.io/api/docs/deployed-contracts.html).

For testnets (`kovan`, `rinkeby` and `ropsten`), please prefix the testnet in lowercase. E.g. https://contracts.synthetix.io/kovan/SynthsUSD

## Bookmark utility

Run the following to get a list of bookmarks you can import into your browser to get useful addresbar keyboard shortcuts (e.g. you could type `feepool kovan` to easily go to the `FeePool` address on `kovan`).

`npm run bookmarks`

You can import this file `bookmarks.html` file into Chrome via:

![image](https://user-images.githubusercontent.com/799038/68231553-4acd7900-ffc9-11e9-9d86-9a8abb1d179a.png)
