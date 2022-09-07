import React from 'react';
import { useEffect, useState } from 'react';
import TimeLog from './TimeLog';

const timerSetting = {
  countingHours: '00',
  countingMinutes: '00',
  countingSeconds: '00',
};

const Timer = () => {
  const [counting, setCounting] = useState(0);
  const [isStopped, setIsStopped] = useState(true);
  const [buttonName, setButtonName] = useState('start!');

  const setTimerSetting = (hours, minutes, seconds) => {
    timerSetting.countingHours = hours.length < 2 ? '0' + hours : hours;
    timerSetting.countingMinutes = minutes.length < 2 ? '0' + minutes : minutes;
    timerSetting.countingSeconds = seconds.length < 2 ? '0' + seconds : seconds;
  };

  const timerHandler = () => {
    setIsStopped((temp) => !temp);
  };

  const timerCallback = () => {
    setCounting((temp) => temp + 1);
  };

  useEffect(() => {
    if (isStopped) {
      setButtonName('start!');
      return;
    }
    timerCallback();
    setButtonName('stop');
    const intervalId = setInterval(() => {
      timerCallback();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isStopped]);

  useEffect(() => {
    let hours = Math.floor(counting / 3600).toString();
    let minutes = Math.floor((counting - hours * 3600) / 60).toString();
    let seconds = ((counting - hours * 3600 - minutes * 60) % 60).toString();

    setTimerSetting(hours, minutes, seconds);
  }, [counting]);

  return (
    <div className="timer-section hidden">
      <div className="timer-container">
        <h1 className="timer">
          <span className="hours">{timerSetting.countingHours}</span>:
          <span className="minutes">{timerSetting.countingMinutes}</span>:
          <span className="seconds">{timerSetting.countingSeconds}</span>
        </h1>
        <button onClick={timerHandler}>{buttonName}</button>
      </div>
      <TimeLog />
    </div>
  );
};

export default Timer;
