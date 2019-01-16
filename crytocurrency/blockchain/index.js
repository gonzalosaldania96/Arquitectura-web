const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

/**
 * @author diego
 * @since 1.0.0
 */
class Blockchain {

    constructor(props) {

        this.chain = [Block.genesis()];

    }


    /**
     * Adds new block to the chain
     *
     * @param data
     */
    addBlock({data}) {

        this.chain.push(Block.mineBlock({lastBlock: this.chain[this.chain.length -1], data}));
    }

    /**
     * The chain is replaced when its valid
     * @param chain
     */
    replaceChain(chain, onSuccess) {

        if(chain.length <= this.chain.length) {

            console.error('The incoming chain must be longer %o', chain);
            return;
        }

        if(!Blockchain.isValidChain(chain)) {

            console.error('The incoming chain must be valid %o', chain);
            return;
        }

        if(onSuccess) {

            onSuccess();
        }

        this.chain = chain;
    }


    /**
     * Checks whether a chain is valid or not
     * @param chain
     * @return {boolean}
     */
    static isValidChain(chain) {

        // validate the first block is genesis
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        // iterate over the block list
        for (let i = 1; i < chain.length; i++) {

            const {timestamp, lastHash, hash, data, difficulty, nonce} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash !== chain[i - 1].hash) return false;

            const currentHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(currentHash !== hash) return false;

            if(Math.abs(lastDifficulty - difficulty > 1)) return false;
        }
        return true;
    }

}

module.exports = Blockchain;