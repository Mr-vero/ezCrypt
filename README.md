# LazyCrypt

LazyCrypt is meticulously crafted for robust key generation, hash creation, and authenticated encryption, employing the formidable AES-256-CBC algorithm. This module offers a seamless and user-friendly approach to managing cryptographic operations within your Node.js applications, ensuring heightened security and ease of integration. It serves as a powerful tool for securing communication between clients and servers, providing a reliable foundation for safeguarding sensitive data during transmission. Additionally, LazyCrypt can be seamlessly integrated to enhance the security of communication between the server and the database, fortifying the protection of critical information at every step of your application's data flow.

## Author

- **Irvan Smith**
- **Date:** Feb 17, 24

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Running the Server](#running-the-server)
- [Usage with Server](#usage-with-server)
- [Integration as Encryption Engine](#integration-as-encryption-engine)
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

## Running the Server

To initiate the server and use LazyCrypt on the client, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/LazyCrypt.git
```

2. Navigate to the project directory:

```bash
cd LazyCrypt
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Now, you can begin generating and reading hashes using the examples provided in the `playground` folder.

## Usage with Server

LazyCrypt can be used both standalone and with a server. When integrated with a server, it serves as an encryption engine, allowing you to encrypt and decrypt every data transfer between the client and server.

## Integration as Encryption Engine

By leveraging LazyCrypt as an encryption engine, you enhance the security of your client-server communication by encrypting sensitive data before transmission and decrypting it upon reception.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# FAQ

### Q: Can LazyCrypt be used in a browser environment?

A: Currently, LazyCrypt is designed for use in Node.js applications. While it may not be directly compatible with browser-based JavaScript, you can explore bundling tools like Webpack or Browserify to adapt it for browser use.

### Q: How can I contribute to LazyCrypt?

A: We welcome contributions! Feel free to fork the repository, make your changes, and submit a pull request. Please ensure you follow the established coding standards and include relevant documentation for your changes.

### Q: Is LazyCrypt suitable for production use?

A: LazyCrypt is designed with security in mind, but it's crucial to thoroughly evaluate any cryptographic tool for your specific use case. We recommend testing and reviewing the codebase to ensure it meets your security requirements before deploying it in a production environment.

### Q: Can LazyCrypt be extended for other encryption algorithms?

A: Currently, LazyCrypt focuses on the AES-256-CBC algorithm. While we don't provide direct support for other algorithms, you can explore the codebase and make necessary modifications to adapt it to your specific cryptographic requirements.

### Q: How can I report a security vulnerability?

A: If you discover a security vulnerability, please follow responsible disclosure practices and reach out to us directly or send an email to security@example.com. We appreciate your cooperation in maintaining the security of LazyCrypt.

### Q: Does LazyCrypt support asynchronous encryption operations?

A: LazyCrypt primarily provides synchronous encryption operations. If your application requires asynchronous functionality, you may need to implement additional mechanisms or explore other libraries that offer asynchronous support.

### Q: Can we decrypt a hash (readHash) if we lose the secret key and public key?

A: No, it is not possible to decrypt a hash generated by LazyCrypt without the secret key. The encryption and decryption processes rely on the secret key, and losing it would render the hash irreversibly unreadable.

### Q: How does the encryption in LazyCrypt work?

A: LazyCrypt employs the Advanced Encryption Standard (AES) with a 256-bit key in Cipher Block Chaining (CBC) mode. When encrypting data, the algorithm takes the input text and a secret key, breaking the data into fixed-size blocks and encrypting each block separately. The CBC mode ensures that each block's encryption depends on the previous block, adding an extra layer of security. The generated hash serves as a secure representation of the original data.

### Q: Can LazyCrypt be used for encrypting sensitive data in transit?

A: Yes, LazyCrypt is well-suited for securing communication between clients and servers. By generating secure hashes for data, it provides a robust method for encrypting sensitive information during transmission. When used appropriately, LazyCrypt helps ensure the confidentiality and integrity of data exchanged between different components of your application.

### Q: What should I do if I suspect a compromise of the secret key?

A: If you suspect a compromise of the secret key, it is crucial to generate a new set of keys immediately. You can use the `LazyCrypt.generateKeys()` function to create a new pair of public and secret keys. Additionally, consider reviewing and auditing your application's security measures to identify and address potential vulnerabilities.

### Q: Is LazyCrypt suitable for encrypting large datasets?

A: LazyCrypt is designed for general-purpose cryptographic operations, but it may not be the most efficient solution for encrypting large datasets. When dealing with extensive amounts of data, consider exploring streaming encryption techniques or other specialized libraries that cater specifically to large-scale encryption requirements.

### Q: Can LazyCrypt be integrated with other encryption algorithms?

A: While LazyCrypt primarily focuses on the AES-256-CBC algorithm, you can explore modifying the codebase to support other encryption algorithms if needed. Keep in mind that any changes to the algorithm may require careful testing to ensure compatibility and security.

### Q: If I generate new keys, can I still read data that was secured using the old keys?

A: No, once you generate new keys with LazyCrypt, the data that was secured using the old keys becomes unreadable with the new keys. Each set of keys uniquely contributes to the encryption process, and changing the keys means the cryptographic transformations will no longer match. To access data secured with the old keys, you must use the original keys that were in use during the encryption process.

### Q: How can I manage data encrypted with different sets of keys?

A: It's essential to maintain a secure record of the keys used for encryption. Consider implementing a key management system to keep track of the version and usage history of keys. This ensures that when decrypting data, the appropriate set of keys is applied based on the version used during the encryption process. Keeping a secure key history is vital for maintaining access to historical encrypted data.


