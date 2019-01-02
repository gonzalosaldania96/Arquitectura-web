const cryptoHash = require('./crypto-hash');

/**
 * Test file for {@link crypto-hash.js}
 *
 * @author diego
 * @since 1.0.0
 */
describe('CryptoHash()', () => {


    it('generates a SHA-256 hashed output', () => {

       expect(cryptoHash('diego')).toEqual("0dbfa8b3b69c95e47fc87f4269293d54ba12c59a9a85925c6cee136b1d8222a5");

    });


    it('it produces a unique hash when the properties have changed on an input', () => {

       const foo = {};
       const originalHash = cryptoHash(foo);
       foo.a = 'a';
       expect(cryptoHash(foo)).not.toEqual(originalHash);

    });

});