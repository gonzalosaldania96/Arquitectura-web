const Block = require('./block');
const {GENESIS_DATA} = require('../config');
const cryptoHash = require('../util/crypto-hash');

/**
 *  Test class for {@link block.js}
 *
 * @author diego
 * @since 1.0.0
 */
describe('Block', () => {

    const timestamp = 'someData';
    const lastHash = 'lastHash';
    const hash = 'theHash';
    const data = 'diego';
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp, lastHash, hash, data, nonce, difficulty});



    test('it was well constructed', () => {

        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    test('it has a genesis block instance of Block', () => {

        expect(Block.genesis()).toBeInstanceOf(Block);
    });


    test('it has a genesis block and returns genesis data', () => {

        const genesisBlock = Block.genesis();
        expect(genesisBlock.timestamp).toEqual(GENESIS_DATA.timestamp);
        expect(genesisBlock.lastHash).toEqual(GENESIS_DATA.lastHash);
        expect(genesisBlock.hash).toEqual(GENESIS_DATA.hash);
        expect(genesisBlock.data).toEqual(GENESIS_DATA.data);
    });


    test('it mines a block', () => {

        const data = 'a new data';
        const lastBlock  = Block.genesis();
        const minedBlock = Block.mineBlock({lastBlock, data});

        expect(minedBlock).not.toBeNull();
        expect(minedBlock).toBeInstanceOf(Block);
        expect(minedBlock.hash)
            .toEqual(
                cryptoHash(
                    minedBlock.timestamp,
                    minedBlock.nonce,
                    minedBlock.difficulty,
                    lastBlock.hash,
                    data
                )
            );
    });

});

