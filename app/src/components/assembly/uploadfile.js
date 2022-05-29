const fetch = require('node-fetch');
const url = 'https://api.assemblyai.com/v2/upload';
const url2 = "https://api.assemblyai.com/v2/transcript";

function readFile(data){
  const params = {
    headers: {
      "authorization": '28f95fc42ebb4cbdabeef04b4bed3a52',
      "Transfer-Encoding": "chunked"
    },
    body: data,
    method: 'POST'
  };
  // data['upload_url']

  // fetch(url, params)
  //   .then(response => response.json().then(data) => {
  //     console.log(data['upload_url']);
  //     return data['upload_url']
  //   })
  //   .catch((error) => {
  //     console.log(`Error: ${error}`);
  //   });

    return fetch(url, params)
    .then((response) => { 
        return response.json().then((data) => {
            console.log(data['upload_url']);
            return data['upload_url'];
        }).catch((err) => {
            console.log(err);
        }) 
    });
};

const upload = async (audioURL) =>{
  audioURL = await readFile(audioURL);
  const data = {
    "audio_url": audioURL
  };
  
  const params = {
    headers: {
      "authorization": '28f95fc42ebb4cbdabeef04b4bed3a52',
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST"
  };
  return fetch(url2, params)
  .then((response) => { 
      return response.json().then((data) => {
        console.log('Success:', data);
        console.log('ID:', data['id']);
          return data['id'];
      }).catch((err) => {
          console.log(err);
      }) 
  });
  // fetch(url2, params)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data);
  //     console.log('ID:', data['id']);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
}

export const download = async (data) => {
  const id = await upload(data);
  const url3 = `https://api.assemblyai.com/v2/transcript/${id}`;
  const params = {
    headers: {
      "authorization": '28f95fc42ebb4cbdabeef04b4bed3a52',
      "content-type": "application/json",
    },
    method: 'GET'
  };
  
  function print(data) {
    switch (data.status) {
      case 'queued':
      case 'processing':
        console.log('AssemblyAI is still transcribing your audio, please try again in a few minutes!');
        break;
      case 'completed':
        console.log(`Success: ${data}`);
        console.log(`Text: ${data.text}`);
        break;
      default:
        console.log(`Something went wrong :-( : ${data.status}`);
        break;
    }
  }
  setInterval(function() {
    fetch(url3, params)
    .then(response => response.json())
    .then(data => {
      setTimeout(print(data), 5000);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}, 5000);

  


};