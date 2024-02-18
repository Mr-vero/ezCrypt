# lazyCrypt

LazyCrypt is designed for secure key generation, hash creation, and authenticated encryption using the AES-256-CBC algorithm. This module provides a simple and convenient way to handle cryptographic operations in your Node.js/Javascript applications.

## Author

- **Irvan Smith**
- **Date:** Feb 17, 24

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [License](#license)

## Installation

To use `lazyCrypt.js` in your Node.js project, install it via npm:

```bash
npm install lazy-crypt
```

## Usage

```javascript
const lazyCrypt = require('lazy-crypt');

// Generate new keys (if not already present) and initialize the module
lazyCrypt.init();

// Get public and secret keys
const keys = lazyCrypt.generateKeys();
const publicKey = keys.publicKey;
const secretKey = keys.secretKey;

// Generate a secure hash for a text
const text = 'Hello, lazyCrypt!';
const hash = lazyCrypt.generateHash(text);

// Read and verify the hash to retrieve the original text
try {
  const decryptedText = lazyCrypt.readHash(hash);
  console.log('Decrypted Text:', decryptedText);
} catch (error) {
  console.error('Error:', error.message);
}
```

## API Reference

### `lazyCrypt.init()`

Initialize the cryptography module. If the key file exists, read keys; otherwise, generate new keys and save them to the file.

### `lazyCrypt.generateKeys()`

Generate and return an object containing public and secret keys.

### `lazyCrypt.generateRandomKey(length)`

Generate a random key of the specified length using `crypto.randomBytes`.

### `lazyCrypt.saveKeysToFile()`

Save public and secret keys to a file with restricted permissions.

### `lazyCrypt.readKeysFromFile()`

Read public and secret keys from the file. If reading fails, generate new keys and save them to the file.

### `lazyCrypt.generateHash(text)`

Generate a secure hash for the given text using AES-256-CBC encryption.

### `lazyCrypt.readHash(hash)`

Read and verify the hash to retrieve the original text.

### `lazyCrypt.calculateHmac(key, data)`

Calculate HMAC for the given data using the provided key.

## Examples

```javascript
// Example: Generate and print new keys
lazyCrypt.generateNewKeys();
console.log('Public Key:', lazyCrypt.publicKey);
console.log('Secret Key:', lazyCrypt.secretKey);
```

```javascript
// Example: Generate hash for a text and print
const textToHash = 'Secure Data';
const hashResult = lazyCrypt.generateHash(textToHash);
console.log('Generated Hash:', hashResult);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
