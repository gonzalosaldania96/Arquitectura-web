/**
 * @author diego
 * @since 1.0.0
 */
class TransactionPool {

    /**
     * Init
     */
    constructor() {

        this.transactionMap = {};
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
}

module.exports = TransactionPool;