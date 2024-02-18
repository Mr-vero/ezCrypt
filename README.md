# LazyCrypt

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

To use `LazyCrypt.js` in your Node.js project, install it via npm:

```bash
npm install Lazy-crypt
```

## Usage

```javascript
const LazyCrypt = require('Lazy-crypt');

// Generate new keys (if not already present) and initialize the module
LazyCrypt.init();

// Get public and secret keys
const keys = LazyCrypt.generateKeys();
const publicKey = keys.publicKey;
const secretKey = keys.secretKey;

// Generate a secure hash for a text
const text = 'Hello, LazyCrypt!';
const hash = LazyCrypt.generateHash(text);

// Read and verify the hash to retrieve the original text
try {
  const decryptedText = LazyCrypt.readHash(hash);
  console.log('Decrypted Text:', decryptedText);
} catch (error) {
  console.error('Error:', error.message);
}
```

## API Reference

### `LazyCrypt.init()`

Initialize the cryptography module. If the key file exists, read keys; otherwise, generate new keys and save them to the file.

### `LazyCrypt.generateKeys()`

Generate and return an object containing public and secret keys.

### `LazyCrypt.generateRandomKey(length)`

Generate a random key of the specified length using `crypto.randomBytes`.

### `LazyCrypt.saveKeysToFile()`

Save public and secret keys to a file with restricted permissions.

### `LazyCrypt.readKeysFromFile()`

Read public and secret keys from the file. If reading fails, generate new keys and save them to the file.

### `LazyCrypt.generateHash(text)`

Generate a secure hash for the given text using AES-256-CBC encryption.

### `LazyCrypt.readHash(hash)`

Read and verify the hash to retrieve the original text.

### `LazyCrypt.calculateHmac(key, data)`

Calculate HMAC for the given data using the provided key.

## Examples

```javascript
// Example: Generate and print new keys
LazyCrypt.generateNewKeys();
console.log('Public Key:', LazyCrypt.publicKey);
console.log('Secret Key:', LazyCrypt.secretKey);
```

```javascript
// Example: Generate hash for a text and print
const textToHash = 'Secure Data';
const hashResult = LazyCrypt.generateHash(textToHash);
console.log('Generated Hash:', hashResult);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
