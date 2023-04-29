import React from 'react';
import { useState, useEffect } from 'react';

const drumProps =[
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {
 
  const [volume, setVolume] = useState(1);
  const [drumTriggerKey, playDrumAudio] = useState("");
  const [speed, setSpeed] = useState(0.5)
  {/*
  var intervalID = setInterval(function() { myFunc('one', 'two', 'three'); }, 1000);
  */}
  const playDrummerTriggerKey = () => {
    let index = 0;
    let keyTriggerArray = drumTriggerKey.split(" ");
    const interval =  setInterval(() => {
      const boxSound = document.getElementById(keyTriggerArray[index]);
      boxSound.currentTime = 0;
      boxSound.play();
      boxSound.volume = volume;
      index++;
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * keyTriggerArray.length -1);
  }
  return (
    <div id="drum-machine" className="bg-info min-vh-100 text-white">
      <div className="text-center">
        <h2>Drum Machine</h2>
          {drumProps.map((audio) => (
            <Box key={audio.id} audio={audio} volume={volume} playDrumAudio={playDrumAudio}/>
          ))}
          <br />
          <h1>Volume</h1>
          <input 
            className="w-30" 
            max="1" 
            min="0" 
            type="range" 
            id="drum-volume-slider" 
            value={volume} 
            onChange={(e) => setVolume(e.target.value)}
            step="0.02"
            />
            <h3>{drumTriggerKey}</h3>
            {drumTriggerKey && (
              <>
              <button onClick={playDrummerTriggerKey} className="btn btn-success p-2 m-2">Play</button>
              <button onClick={() => playDrumAudio("")} className="btn btn-danger p-2">Reset</button>
              <br />
              <input 
                className="w-30" 
                max="1.2" 
                min="0.01" 
                type="range" 
                id="drum-volume-slider" 
                value={speed} 
                onChange={(e) => setSpeed(e.target.value)}
                step="0.01"
                />
              </>
            )}
          {/*
                <div>
                  <input type="range" id="volume" name="volume"
                        min="0" max="11">
                  <label for="volume">Volume</label>
                </div>

                <div>
                  <input type="range" id="cowbell" name="cowbell" 
                        min="0" max="100" value="90" step="10">
                  <label for="cowbell">Cowbell</label>
                </div>                   
          */}

      </div>
    </div>
  );
}

function Box({audio, volume, playDrumAudio}) {

  const [isActive, setAactive] = useState(false);
  // Handler for key code on key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === audio.keyCode) {
      boxSound();      
    }
  }
  {/*}
  useEffect(() => {
    // Good!
    document.addEventListener("keydown", {
      handleKeyPress: function (e) {
        if (e.keyCode === audio.keyCode) {
          boxSound();
        }
      }
    })
  }, []);
*/}

  const boxSound = () => {
    const boxSound = document.getElementById(audio.keyTrigger);
    playDrumAudio(prev => prev + audio.keyTrigger + " ")
    boxSound.currentTime = 0;
    boxSound.play();
    setAactive(true);
    boxSound.volume = volume;
    setTimeout(() => {
      setAactive(false);
    }, 400);
  };
  return (
    <div onClick={boxSound} className={`btn btn-secondary p-5 m-4 ${isActive && 'btn-warning'}`}>
        <audio className="box" id={audio.keyTrigger} src={audio.url} />
        {audio.keyTrigger}
    </div>
  );
}

export default App;
