const cryptoHash = require('./crypto-hash');

/**
 * Test file for {@link crypto-hash.js}
 *
 * @author diego
 * @since 1.0.0
 */
describe('CryptoHash()', () => {


    it('generates a SHA-256 hashed output', () => {

       expect(cryptoHash('diego')).toEqual('00e48a815525529ba9d33f8761a167588fe00c47bc82f515cf791c482ed99ecc');

    });


});