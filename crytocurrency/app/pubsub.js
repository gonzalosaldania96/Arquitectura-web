const redis = require('redis');

/**
 * @author diego
 * @since 1.0.0
 */

const CHANNELS = {

    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {

    constructor({blockchain}) {

        this.blockchain = blockchain;
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

        if(channel === CHANNELS.BLOCKCHAIN) {

            this.blockchain.replaceChain(parsedMessage);
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

}


module.exports = PubSub;