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
    createTransaction({recipient, amount, chain}) {

        if(chain) {

            this.balance = Wallet.calculateBalance({chain, address: this.publicKey});
        }

        if(amount > this.balance) {
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({senderWallet: this, recipient, amount});
    }

    /**
     *
     */
    static calculateBalance({chain, address}) {

        let hasConductedTransactions = false;
        let outputsTotal = 0;

        // skip genesis
        for(let i = chain.length-1; i > 0; i--) {

            const block = chain[i];

            for(let transaction of block.data) {

                if(transaction.input.address === address) {

                    hasConductedTransactions = true;
                }

                const addressOutput = transaction.outputMap[address];

                if(addressOutput) {

                    outputsTotal += addressOutput;
                }
            }

            if(hasConductedTransactions) {
                break;
            }
        }

        return hasConductedTransactions ? outputsTotal : (STARTING_BALANCE + outputsTotal);
    }

}

module.exports = Wallet;
