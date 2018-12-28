const Blockchain = require('./index');
const Block = require('./block');

/**
 * Test suite for {@link Blockchain} class
 *
 * @author diego
 * @since 1.0.0
 */
describe('Blockchain()', () => {

    let blockchain,
        newChain,
        errorMock;

    beforeEach(() => {

        blockchain = new  Blockchain();
        newChain = new  Blockchain();
        errorMock = jest.fn();
        global.console.error = errorMock;
    });


    it('contains a chain array', () => {

       expect(blockchain.chain).toBeInstanceOf(Array);
    });

    it('starts with the genesis block', () => {

       expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {

        const aData = 'diego marafetti';
        blockchain.addBlock({data: aData});
        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(aData);
    });



    describe('isValidChain()', () => {

        it('when it does not starts with the genesis block', () => {

            blockchain.chain[0] = {data: 'blah'};
            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });

        it('when it starts with the genesis block and has multiple invalid blocks', () => {

            blockchain.addBlock({data: 'test1'});
            blockchain.addBlock({data: 'test2'});
            blockchain.addBlock({data: 'test3'});
            blockchain.addBlock({data: 'test4'});
            blockchain.chain[2].lastHash = 'broken hash';

            expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });

        it('when it starts with the genesis block multiple valid blocks', () => {

            blockchain.addBlock({data: 'test1'});
            blockchain.addBlock({data: 'test2'});
            blockchain.addBlock({data: 'test3'});
            blockchain.addBlock({data: 'test4'});

            expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });

    });



    describe('replaceChain()', () => {

        it('the chain is valid the chain when is replaced', () => {

            blockchain.replaceChain(newChain.chain);
            expect(blockchain.chain).toEqual(newChain.chain);
        });

        it('logs an error', () => {

            blockchain.replaceChain(newChain.chain);
            expect(errorMock).toHaveBeenCalled();
        });

    });

});
