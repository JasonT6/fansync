const fetch = require('node-fetch');
const url = 'https://api.assemblyai.com/v2/upload';

export function readFile(data){
  const params = {
    headers: {
      "authorization": '28f95fc42ebb4cbdabeef04b4bed3a52',
      "Transfer-Encoding": "chunked"
    },
    body: data,
    method: 'POST'
  };

  fetch(url, params)
    .then(response => response.json())
    .then(data => {
      console.log(data['upload_url']);
      return data['upload_url'];
    })
    .catch((error) => {
      return(`Error: ${error}`);
    });
};