# steam-price
[![npm version](https://img.shields.io/npm/v/steam-price.svg)](https://www.npmjs.com/package/steam-price)
[![Known Vulnerabilities](https://snyk.io/test/npm/steam-price/badge.svg)](https://snyk.io/test/npm/steam-price?tab=dependencies&vulns=all)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://www.npmjs.com/package/steam-price)
[![npm downloads](https://img.shields.io/npm/dt/steam-price.svg)](https://www.npmjs.com/package/steam-price)

**steam-price** uses the [@opskins/api](https://www.npmjs.com/package/@opskins/api) module to get item prices for multiple apps

### Installation
`npm install steam-price`


### Initialize
- `api` Your [opskins API key](https://opskins.com/?loc=store_account#collapseAA)
```js
const pricing = require('steam-price');

pricing.setup(api);
```


### Supported apps
- `730` CS:GO
- `440` TF2
- `570` Dota 2
- `295110` JS
- `433850` H1Z1
- `578080` PUBG
- `218620` PAYDAY 2
- `304930` Unturned
- `252490` Rust
- `232090` KF2
- `489940` BAT44
- `753` Steam
- `1911` CryptoKitties
