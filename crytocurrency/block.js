const {GENESIS_DATA} = require('./config');

/**
 * @author diego
 * @since 1.0.0
 */
class Block {

    constructor({timestamp, lastHash, hash, data}) {

        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
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