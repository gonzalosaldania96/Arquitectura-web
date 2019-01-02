const EC = require('elliptic').ec;
const cryptoHash = require('./crypto-hash');

/**
 * @author diego
 * @since 1.0.0
 */

const ec = new EC('secp256k1');


/**
 * @param publicKey
 * @param data
 * @param signature
 */
const verifySignature = ({publicKey, data, signature}) => {

    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

    return keyFromPublic.verify(cryptoHash(data), signature);
};


module.exports = {ec, verifySignature};