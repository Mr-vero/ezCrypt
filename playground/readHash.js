const hashToBeDecrypted = '+JtlTXf/qephirjE7uNYt0+2JELE/uxoWy6RDa7iEI0=s1sDUmpwfcmXxQmZ7oaIYLseE1E9eL6uBdMSGR/Po9vrcvs3snOYdxCbN9vxhmRA';

fetch('http://localhost:3000/readHash', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ hash: hashToBeDecrypted }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Decrypted Text:', data.decryptedText);
  })
  .catch(error => {
    console.error('Error:', error);
  });
