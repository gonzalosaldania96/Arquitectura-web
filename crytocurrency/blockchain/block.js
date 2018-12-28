const {GENESIS_DATA, MINE_RATE} = require('../config');
const cryptoHash = require('../util/crypto-hash');
const hexToBinary = require('hex-to-binary');

/**
 * @author diego
 * @since 1.0.0
 */
class Block {

    constructor({timestamp, lastHash, hash, data, nonce, difficulty}) {

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }


    /**
     * Mine a block
     *
     * @param lastBlock
     * @param data
     * @return {Block}
     */
    static mineBlock({lastBlock, data}) {

        let hash, timestamp;
        const lastHash =  lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

        } while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({timestamp, lastHash, hash, data, nonce, difficulty});
    }


    /**
     * @param originalBlock
     * @param timestamp
     * @return {*}
     */
    static adjustDifficulty({originalBlock, timestamp}) {

        const {difficulty} = originalBlock;
        const difference = timestamp - originalBlock.timestamp;
        if(difficulty < 1) return 1;
        if(difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }


    /**
     * Returns a new genesis block
     *
     * @return {Block}
     */
    static genesis() {

        return new this(GENESIS_DATA);
    }
}

module.exports = Block;