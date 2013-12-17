generate-wallet
===============

Generate bitcoin wallets in various format

## Synopsis

``` javascript
    ./generate-wallet.js 10
        => Generate 10 Private keys using WIF + Timestamp (importable from Multibit client)

    ./generate-wallet.js --format=bitaddess 15
        => Generate 15 Private Keys + Address, using Bitaddress.org bulk format


    ./generate-wallet.js --help
        => check options
```

## API

### 
``` javascript
    var Multibit    = require('Multibit').class();
    var BitAddress  = require('BitAddress').class();

    var generator = new Multibit({
            network: networks.livenet
    }); 

    console.log( generator.getOne() ); # new wallet, in multibit format


    generator = new BitAddress({
            network: networks.livenet
    }); 

    console.log( generator.getOne() ); # new wallet, in bitaddress format
```

## TODO
Better documention. Export Multibit/Bitaddress.

