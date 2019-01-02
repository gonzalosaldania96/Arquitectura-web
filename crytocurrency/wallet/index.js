const {STARTING_BALANCE} = require('../config');
const {ec} = require('../util');
const cryptoHash = require('../util/crypto-hash');
const Transaction = require('./transaction');

/**
 * @author diego
 * @since 1.0.0
 */
class Wallet {


    /**
     * Init
     */
    constructor() {

        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }


    /**
     * @param data
     * @return {*}
     */
    sign(data) {

        return this.keyPair.sign(cryptoHash(data));
    }


    /**
     * @param recipient
     * @param amount
     */
    createTransaction({recipient, amount}) {

        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({senderWallet: this, recipient, amount});
    }

}

module.exports = Wallet;
