/**
 *
 * @author diego
 * @since 1.0.0
 */

const INITIAL_DIFFICULTY = 6;
const MINE_RATE = 1000;
const GENESIS_DATA = {

    timestamp: 1,
    lastHash: '*****',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

module.exports = {GENESIS_DATA, MINE_RATE};
