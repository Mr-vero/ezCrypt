// LazyCrypt.test.js
const fs = require('fs');  // Add this line
const assert = require('assert');
const LazyCrypt = require('../LazyCrypt');


// Mock data for testing
const mockUserEmail = 'user@example.com';

// Test suite for LazyCrypto module
describe('LazyCrypt', () => {
    // Test case for generateHash and readHash functions
    it('should generate and read a valid hash', () => {
        LazyCrypt.init(); // Initialize or load keys

        // Generate a hash for the mock email
        const hashedEmail = LazyCrypt.generateHash(mockUserEmail);

        // Ensure that the hash is not empty and has the correct format
        assert.ok(hashedEmail);
        assert.strictEqual(typeof hashedEmail, 'string');
        assert.strictEqual(hashedEmail.length, 108); // 44 characters for authTag, 44 characters for IV + encrypted data

        try {
            // Attempt to read and decrypt the hash
            const decryptedEmail = LazyCrypt.readHash(hashedEmail);

            // Ensure that the decrypted email matches the original email
            assert.strictEqual(decryptedEmail, mockUserEmail);
        } catch (error) {
            // If an error occurs during reading, fail the test
            assert.fail(`Error: ${error.message}`);
        }
    });

    // Test case for generating and reading an invalid hash (tampered hash)
    it('should fail to read tampered hash', () => {
        LazyCrypt.init();

        const hashedEmail = LazyCrypt.generateHash(mockUserEmail);
        const tamperedHash = hashedEmail.replace(/A/g, 'B'); // Tamper with the hash

        // Ensure that attempting to read tampered hash throws an error
        assert.throws(() => {
            LazyCrypt.readHash(tamperedHash);
        }, (error) => {
            // Check if the error message matches the expected message
            return error.message.includes('Authentication failed. The data may have been tampered with.');
        });
    });


    // Test case for initializing and generating keys
    it('should initialize and generate new keys if file is missing', () => {
        fs.unlinkSync('.ezKeys'); // Delete the key file to simulate its absence
        LazyCrypt.init();

        // Ensure that new keys are generated and saved to a new key file
        assert.ok(fs.existsSync('.ezKeys'));
        const keysData = fs.readFileSync('.ezKeys', 'utf-8');
        const keys = JSON.parse(keysData);
        assert.strictEqual(keys.publicKey.length, 32);
        assert.strictEqual(keys.secretKey.length, 64);
    });

});
