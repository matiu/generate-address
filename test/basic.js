
LIBCOIN = './node_modules/libcoin/';
TEST_LIBCOIN = '../node_modules/libcoin/';

var networks    = require( TEST_LIBCOIN + 'networks');
var PrivateKey  = require( TEST_LIBCOIN + 'PrivateKey').class();
var Address     = require( TEST_LIBCOIN + 'Address').class();
var coinUtil    = require( TEST_LIBCOIN + './util/util');

var assert = require("assert")

var Multibit = require('../Multibit').class();

describe('Multibit format', function(){

    var generator = new Multibit({
            network: networks.livenet
    }); 

    describe('getOne', function(){

        var one = generator.getOne();
        var items = one.split(' ');
        var pk      = items[0];
        var time    = items[1];

        it('WIF PrivKey should be valid', function(){
            assert.ok( pk.length    == 51);

            var pk_ref  = new PrivateKey(pk, 'base58');

            try {
                pk_ref.validate();
                assert.ok(1);
            } catch(e) {
                assert.ok(0);
            }
        })

        it('Time should be valid ISO8061', function(){
            assert.ok( time.length  == 20);
            assert.ok( new Date(time) > new Date('2013-12-17 11:00:00'));
            assert.ok( time == new Date(time).toISOString().replace(/\.\d\d\d/,''));
        })
 
 
  })
})


var BitAddress = require('../BitAddress').class();
var KeyModule  = require( TEST_LIBCOIN + './Key');

describe('BitAddress format', function(){

    var generator = new BitAddress({
            network: networks.livenet
    }); 

    describe('getOne', function(){

        var one = generator.getOne();
        var items = one.split(',');
        var idx     = items[0];
        var pk      = items[1];
        var addr    = items[2];

        it('WIF PrivKey should be valid', function(){
            assert.ok( pk.length    == 51);

            var pk_ref  = new PrivateKey(pk, 'base58');

            try {
                pk_ref.validate();
                assert.ok(1);
            } catch(e) {
                assert.ok(0);
            }
        })

        it('Address should be valid', function(){
            assert.ok( addr.length  == 34);
        })

        it('Public Address should correspond to private key', function(){

            var pk_ref  = new PrivateKey(pk, 'base58');


            var key  = new KeyModule.Key();
            key.private = pk_ref.payload();
            key.regenerateSync();
            assert( key.public.length == 33 );

            var pubKeyHash = coinUtil.sha256ripe160(key.public);
           var addr_ref = new Address(generator.network.addressPubkey, pubKeyHash);

           assert(addr_ref.toString() == addr );
        });
	
  })
})



