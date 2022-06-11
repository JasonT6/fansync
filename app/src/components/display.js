import React,{Component, useState } from'react';
import {HSVtoRGB, RGBtoHSV} from './color';
const data = require('./jsonArray3.json');


function Display(props){
    function dataText (data){
        let data2 = [data[2],data[1],data[0]];
        // data2 = RGBtoHSV(data2);
        // data2[3] = 100;
        // data2 = HSVtoRGB(data2);
        let string = '';
        string = string + data2[0] + ',' + data2[1] + ',' + data2[2];
        return string;
    }

    const [frame, frameSet] = useState(0);
    const [buttonstate, buttonSet] = useState('');
    let cur_frame = 0;
    function displayForm() { 

        let divs = [];
        let count = 1;
         for(let i = 0; i < 28; i++) {
             for(let j = 0; j < 78; j++){
                divs.push (<div key = {count} style={{backgroundColor: `rgb(${dataText(data[frame][i][j])})`}}>{buttonstate ? (<div></div>) : (<div>☐
                    </div>)}</div>);
                count++;
             }
              
          }
          return divs;
    }
    function handleClick(){
        buttonSet('recordactive');
        frameSet(frame + 1);
        let framerate = 20;
        let framecur = 0;
        let index = 0;
        let index2 = 0;
        while(index < 357){
            index += 1;
            framecur += framerate;
            setTimeout(function(){
                frameSet(index2);
                index2 += 1;
                console.log(index2);
                if(index2 == 356){
                    buttonSet('');
                }
            }, framecur);
            console.log(framecur);

        }

    

        
        

    }


    
    return(
    <div className = {"container " + buttonstate}>
        <div className = "grid">
            {displayForm()}
        </div>
        <button onClick={handleClick} className = {"record " + buttonstate}>{buttonstate ? (<div>Playing SYNC</div>) : (<div>Play SYNC</div>)}</button>
    </div>
    
    
    )
}
export default Display