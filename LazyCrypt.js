/**
 * lazyCrypt.js
 *  
 * Cryptography module for secure key generation, hash creation, and authenticated encryption using AES-256-CBC.
 * Author: Irvan Smith
 * Date: Feb 17, 24
 */

const crypto = require('crypto');
const fs = require('fs');

class LazyCrypt {
  constructor() {
    // File name for storing keys
    this.KEY_FILE_NAME = '.ezKeys';

    // Configuration object with default values
    this.config = {
      keyLength: {
        publicKey: 16,
        secretKey: 32,
      },
      filePermissions: 0o600,
      hashAlgorithm: 'aes-256-cbc',
      hmacAlgorithm: 'sha256',
    };

    // Public and secret keys
    this.secretKey = '';
    this.publicKey = '';

    // Initialize the module
    this.init();
  }

  /**
   * Initialize the cryptography module.
   * If the key file exists, read keys; otherwise, generate new keys and save them to the file.
   */
  init() {
    if (fs.existsSync(this.KEY_FILE_NAME)) {
      this.readKeysFromFile();
    } else {
      this.generateNewKeys();
      this.saveKeysToFile();
    }
  }

  /**
   * Generate new random public and secret keys.
   */
  generateNewKeys() {
    this.publicKey = this.generateRandomKey(this.config.keyLength.publicKey);
    this.secretKey = this.generateRandomKey(this.config.keyLength.secretKey);
  }

  /**
   * Generate and return an object containing public and secret keys.
   * @returns {Object} - { publicKey, secretKey }
   */
  generateKeys() {
    return {
      publicKey: this.publicKey,
      secretKey: this.secretKey,
    };
  }

  /**
   * Generate a random key of the specified length using crypto.randomBytes.
   * @param {number} length - Length of the key in bytes.
   * @returns {string} - Hexadecimal representation of the generated key.
   */
  generateRandomKey(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Save public and secret keys to a file with restricted permissions.
   */
  saveKeysToFile() {
    const keysData = JSON.stringify({
      publicKey: this.publicKey,
      secretKey: this.secretKey,
    });
    fs.writeFileSync(this.KEY_FILE_NAME, keysData, {
      mode: this.config.filePermissions,
    });
  }

  /**
   * Read public and secret keys from the file.
   * If reading fails, generate new keys and save them to the file.
   */
  readKeysFromFile() {
    try {
      const keysData = fs.readFileSync(this.KEY_FILE_NAME, 'utf-8');
      const keys = JSON.parse(keysData);
      this.publicKey = keys.publicKey;
      this.secretKey = keys.secretKey;
    } catch (error) {
      console.error('Error reading keys from file:', error.message);
      // Generate new keys if file reading fails
      this.generateNewKeys();
      this.saveKeysToFile();
    }
  }

  /**
   * Generate a secure hash for the given text using AES-256-CBC encryption.
   * @param {string} text - Text to be hashed.
   * @returns {string} - Authenticated and encrypted hash.
   */
  generateHash(text) {
    const strengthenedKey = this.generateStrengthenedKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.config.hashAlgorithm,
      strengthenedKey,
      iv
    );
    let hash = cipher.update(text, 'utf-8', 'base64');
    hash += cipher.final('base64');
    const ivAndHash = Buffer.concat([iv, Buffer.from(hash, 'base64')]);
    const hmac = crypto.createHmac(this.config.hmacAlgorithm, strengthenedKey);
    hmac.update(ivAndHash);
    const authTag = hmac.digest('base64');
    return authTag + ivAndHash.toString('base64');
  }

  /**
   * Generate a strengthened key using SHA-256 hash of the concatenation of public and secret keys.
   * @returns {Buffer} - Strengthened key.
   */
  generateStrengthenedKey() {
    return crypto
      .createHash('sha256')
      .update(this.secretKey + this.publicKey)
      .digest();
  }

  /**
   * Read and verify the hash to retrieve the original text.
   * @param {string} hash - Authenticated and encrypted hash.
   * @returns {string} - Decrypted text.
   * @throws {Error} - If authentication fails, indicating potential tampering.
   */
  readHash(hash) {
    const authTag = hash.slice(0, 44);
    const ivAndHash = Buffer.from(hash.slice(44), 'base64');
    const strengthenedKey = this.generateStrengthenedKey();
    const calculatedAuthTag = this.calculateHmac(strengthenedKey, ivAndHash);

    if (calculatedAuthTag !== authTag) {
      throw new Error(
        'Authentication failed. The data may have been tampered with.'
      );
    }

    const iv = ivAndHash.slice(0, 16);
    const encryptedText = ivAndHash.slice(16).toString('base64');
    const decipher = crypto.createDecipheriv(
      this.config.hashAlgorithm,
      strengthenedKey,
      iv
    );
    let text = decipher.update(encryptedText, 'base64', 'utf-8');
    text += decipher.final('utf-8');
    return text;
  }

  /**
   * Calculate HMAC for the given data using the provided key.
   * @param {Buffer} key - Key for HMAC calculation.
   * @param {Buffer} data - Data for HMAC calculation.
   * @returns {string} - Calculated HMAC.
   */
  calculateHmac(key, data) {
    const hmac = crypto.createHmac(this.config.hmacAlgorithm, key);
    hmac.update(data);
    return hmac.digest('base64');
  }
}

module.exports = new LazyCrypt();

