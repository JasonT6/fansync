import React,{Component, useState } from'react';
import MicRecorder from "mic-recorder-to-mp3";
import {readFile} from "./assembly/uploadfile";
const url = 'https://api.assemblyai.com/v2/upload';

const Mp3Recorder = new MicRecorder({
    bitRate: 64,
    // prefix: "data:audio/wav;base64,",
  });

function Record(props) {
    var [recording, stateRecording] = useState('');
    
    function startRecord () {
        stateRecording('recordActive');
        Mp3Recorder.start()
        .then(() => {
            stateRecording('recordActive');
        })
        .catch((e) => console.error(e));
    }

    function endRecord () {
        stateRecording('');
        Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
              const audioURL = URL.createObjectURL(blob);
              const player = new Audio(audioURL);
              player.play();
              console.log(audioURL);
              var link = readFile(audioURL);
              console.log(link);
        })
        .catch((e) => console.log(e));
    }
    const handleClick = () => {
        if(recording === ''){
            startRecord();
        } else if (recording === 'recordActive'){
            endRecord();
        }
        
    }


    return(
        <button onMouseDown = {handleClick} className= {`record ${recording}`}>R</button>
    )

}

export default Record