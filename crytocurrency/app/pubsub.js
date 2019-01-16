const redis = require('redis');

/**
 * @author diego
 * @since 1.0.0
 */

const CHANNELS = {

    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {

    constructor({blockchain, transactionPool, wallet}) {

        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscribeToChannels();
        this.subscriber.on('message', this.handleMesasage.bind(this));
    }

    subscribeToChannels() {

        Object.values(CHANNELS).forEach(channel => this.subscriber.subscribe(channel));
    }


    /**
     * @param channel
     * @param message
     */
    handleMesasage(channel, message) {

        console.log('Message received. Channel: %s. Message: %o', channel, message);

        const parsedMessage = JSON.parse(message);

        switch(channel) {

            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, () => {
                    this.transactionPool.clearBlockchainTransactions({chain: parsedMessage});
                });
                break;

            case CHANNELS.TRANSACTION:
                if(!this.transactionPool.existingTransaction({inputAddress: this.wallet.publicKey})){
                    this.transactionPool.setTransaction(parsedMessage);
                }
                break;
        }
    }

    /**
     * @param channel
     * @param message
     */
    publish({channel, message}) {

        this.subscriber.unsubscribe(channel, () => {

            this.publisher.publish(channel, message, () => {

                this.subscriber.subscribe(channel);
            });

        });

    }

    /**
     *  Broadcast
     */
    broadcastChain() {

        this.publish({

            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    /**
     *
     * @param trasaction
     */
    broadcastTransaction(transaction) {

        this.publish({

            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }

}


module.exports = PubSub;