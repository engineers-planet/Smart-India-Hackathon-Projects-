import Webcam from 'react-webcam';

import React, { useEffect, useRef } from 'react';

function Video() {
  const FPS = 5;
  const WS_URL = 'wss://reachoutgestureapi-production.up.railway.app/get_gesture';
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };
  const scroll = (direction) => {
    if (direction === '0') {
      globalThis.window.scrollTo({
        top: globalThis.window.scrollY + 100,
        left: 0,
        behavior: 'smooth',
      });
    } else if (direction === '1') {
      globalThis.window.scrollTo({
        top: globalThis.window.scrollY - 100,
        left: 0,
        behavior: 'smooth',
      });
    }
    else {

    }
  };
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log(`Connected to ${WS_URL}`);
      setInterval(() => {
        ws.send(capture());
      }, 1000 / FPS);
    };
    let rec = -1;
    ws.onmessage = (msg) => {
      // console.log(msg);
      // console.log(typeof msg.data);
      let prev = rec;
      // console.log(JSON.parse(msg.data)['gesture'])
      rec = JSON.parse(msg.data)['gesture'];
      console.log(rec);
      console.log(rec.type);
      // if (prev === rec) {
      scroll(rec);
      // console.log('Previous equal rec');
      // } else {
      // console.log(rec)
      // console.log(prev)
      // console.log('Previous not equal rec');
      // }
    };
  }, []);
  return (
    <div class="floating-videoCam" id="flip-horizontal">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
    </div>
  );
}

export default Video;
