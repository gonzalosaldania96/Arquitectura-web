const Blockchain = require('../blockchain/index');

/**
 * Test script
 *
 * @author diego
 * @since 1.0.0
 */
const blockchain = new Blockchain();

blockchain.addBlock({data: 'initial data'});

let prevTimestamp,
    nextTimestamp,
    nextBlock,
    timeDiff,
    avarage;

const times = [];


for(let i = 0; i < 10000; i++) {

    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock({data: `block ${i}`});

    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff);
    avarage = times.reduce((total, el) => (total + el)/times.length);

    console.log('Time mine %d ms, difficulty: %d - hash: %s', timeDiff, nextBlock.difficulty, nextBlock.hash);

}

