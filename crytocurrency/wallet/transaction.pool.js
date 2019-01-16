const Transaction = require("./transaction");

/**
 * @author diego
 * @since 1.0.0
 */

class TransactionPool {

    /**
     * Init
     */
    constructor() {

        this.clear();
    }

    /**
     * Reset transaction map
     */
    clear() {

        this.transactionMap = {};
    }

    /**
     * @param chain
     */
    clearBlockchainTransactions({chain}) {

        for(let i=1; i < chain.length; i++) {

            const block = chain[i];

            for(let transaction of block.data) {

                if(this.transactionMap[transaction.id]) {

                    delete this.transactionMap[transaction.id];
                }
            }
        }
    }

    /**
     * @param transaction
     */
    setTransaction(transaction) {

       this.transactionMap[transaction.id] = transaction;
    }

    /**
     * @param transaction
     * @return {boolean}
     */
    existingTransaction({inputAddress}) {

        const txs = Object.values(this.transactionMap);
        return txs.find(tx => tx.input.address === inputAddress)
    }

    /**
     * @param rootTransactionPoolMap
     */
    setMap(rootTransactionPoolMap) {
        this.transactionMap = rootTransactionPoolMap;
    }

    /**
     *
     */
    validTransactions() {
        Object.values(this.transactionMap).filter(t => Transaction.validTransaction(t));

    }
}

module.exports = TransactionPool;