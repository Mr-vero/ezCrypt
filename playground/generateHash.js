const textToBeHashed = 'YourTextToBeHashed';

fetch('http://localhost:3000/generateHash', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: textToBeHashed }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Generated Hash:', data.hash);
  })
  .catch(error => {
    console.error('Error:', error);
  });
