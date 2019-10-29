# SNX Contracts Auto Redirect

[![Netlify Status](https://api.netlify.com/api/v1/badges/295e6a34-6f46-442d-9902-93129e1cf921/deploy-status)](https://app.netlify.com/sites/synthetix-contracts/deploys)

This is the SNX auto redirection tool. It uses `HTTP 302` temporary redirects to redirect to the latest version of the Synthetix protocol contracts on Etherscan. It's here for conveninence for those who often deal with the contracts directly, and for linking to deployed contracts in blog posts, etc.

Please use `/ContractName` (case-sensitive) to auto-redirect to the latest contract version. E.g. https://contracts.synthetix.io/Synthetix links to the latest underlying.

For the full list of contract names, please [look at our developer docs](https://developer.synthetix.io/api/docs/deployed-contracts.html).

For testnets (`kovan`, `rinkeby` and `ropsten`), please prefix the testnet in lowercase. E.g. https://contracts.synthetix.io/kovan/SynthsUSD
