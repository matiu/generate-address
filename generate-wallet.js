#!/usr/bin/env node


LIBCOIN = './node_modules/libcoin/';


var networks    = require( LIBCOIN + 'networks');

var Multibit    = require('./Multibit').class();
var BitAddress  = require('./BitAddress').class();

opt = require('node-getopt').create([
  ['F' , 'format=ARG'   , 'format (multibit, bitaddress)'],
  ['h' , 'help'                , 'display this help'],
])              // create Getopt instance
.bindHelp()     // bind option 'help' to default action
.parseSystem(); // parse command line

var n       = parseInt(opt.argv[0]);
var format  = opt.options.format || 'multibit';

if ( !n ) {
    console.log("Usage " + process.argv[1] + " number");
    process.exit(1);
}

var generator;
switch(format) {
    case 'multibit':
        generator = new Multibit({
            network: networks.livenet
        });
        break;
    case 'bitaddress':
        generator = new BitAddress({
            network: networks.livenet
        });
        break;
 
    default:
        console.log("Unknow format " + format);
        process.exit(1);
}

console.log( "# format is : " + format + " => "   + generator.desc() );
 
for(var i = 0; i < n; i++) {
    console.log(generator.getOne(i));
}

