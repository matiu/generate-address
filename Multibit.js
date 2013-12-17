require('classtool');

var PrivateKey  = require( LIBCOIN + 'PrivateKey').class();
var WalletKey   = require( LIBCOIN + 'WalletKey').class();

function ClassSpec(b) {
  function Multibit( opts ) {
    this.network  = opts.network;
  };

  Multibit.prototype.getOne = function() {
      var wk =  new WalletKey({
          network: this.network
      });
      wk.generate();

      var pk = new PrivateKey(0x80, wk.privKey.private);
      var d = new Date();
      return pk.toString() + " " + d.toISOString().replace(/\.\d\d\d/,'');
  };

  Multibit.prototype.desc = function() {
    return "WIF Date(ISO8601)"
  };

  return Multibit;
};
module.defineClass(ClassSpec);
