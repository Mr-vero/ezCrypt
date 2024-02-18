// usage example
const lazyCrypt = require('./LazyCrypt');

// Use the keys to generate a hash
const textToHash = 'Hello, secure world!';
const hash = lazyCrypt.generateHash(textToHash);
console.log('Generated Hash:', hash);

// Read and verify the hash to retrieve the original text
try {
  const decryptedText = lazyCrypt.readHash(hash);
  console.log('Decrypted Text:', decryptedText);
} catch (error) {
  console.error('Error:', error.message);
}
