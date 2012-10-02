﻿var crypto = require('crypto');
var util = require('util');
var Stream = require('stream').Stream;
var rsa = require("bignumber");
var EncryptionStream = require('./encryptionStream');

function Encryption() {
    Stream.call(this);
    this.writable = true;
    this.readable = true;

    this.key = new rsa.Key();
    console.log('Generating RSA key...');
    this.key.generate(1024, "10001");
    this.buildASN();
};

util.inherits(Encryption, Stream);

Encryption.prototype.buildASN = function() {
	var asnHeader = new Buffer([0x30, 0x81, 0x9F, 0x30, 0x0D, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7,
								0x0D, 0x01, 0x01, 0x01, 0x05, 0x00, 0x03, 0x81, 0x8D, 0x00, 0x30, 0x81, 
								0x89, 0x02, 0x81, 0x81, 0x00]);
	var modBuffer = new Buffer(this.key.n.toString(16), 'hex');
	var expBuffer = new Buffer([0x02, 0x03, 0x01, 0x00, 0x01]);

	this.ASN = Buffer.concat([asnHeader, modBuffer, expBuffer], 162);
};

Encryption.prototype.decryptSharedSecret = function(encyptedSecret) {
	return key.decrypt(encyptedSecret);
};

Encryption.prototype.getEncryptor = function(sharedSecret) {
	return new EncryptionStream('e', sharedSecret);
};


Encryption.prototype.getDecryptor = function(sharedSecret) {
	return new EncryptionStream('d', sharedSecret);
};


module.exports = Encryption;