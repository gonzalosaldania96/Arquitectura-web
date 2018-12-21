const Block = require('./block');
const {GENESIS_DATA} = require('./config');

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
    const data = 'data';
    const block = new Block(timestamp, lastHash, hash, data);



    test('it was well constructed', () => {

        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
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

});

