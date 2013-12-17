require('classtool');

var PrivateKey  = require( LIBCOIN + 'PrivateKey').class();
var WalletKey   = require( LIBCOIN + 'WalletKey').class();

function ClassSpec(b) {
  function BitAddress( opts ) {
    this.network  = opts.network;
  };

  BitAddress.prototype.getOne = function(index) {
      var wk =  new WalletKey({
          network: this.network
      });
      wk.generate();

      var pk = new PrivateKey(0x80, wk.privKey.private);
      var d = new Date();

      return index + "," 
            + pk.toString() + "," 
            + wk.storeObj().addr
            ;
  };

  BitAddress.prototype.desc = function() {
    return "Index,WIF,Address(compressed)"
  };

  return BitAddress;
};
module.defineClass(ClassSpec);
