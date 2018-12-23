const crypto = require('crypto');


/**
 * @author diego
 * @since 1.0.0
 */
const cryptoHash = (...inputs) => {

    return crypto.createHash('sha256').update(inputs.sort().join(' ')).digest('hex');
};


module.exports = cryptoHash;
