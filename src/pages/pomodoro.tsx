import React, { useState, useEffect, useRef } from 'react';
import { PomodoroNavbar } from '../../components/Navbar';

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // total seconds
  const [isRunning, setIsRunning] = useState(false);
  const [workMode, setWorkMode] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.play();
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const resetTimer = (mode: "work" | "rest") => {
    setIsRunning(false);
    setWorkMode(mode === "work");
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    resetTimer(workMode ? "work" : "rest");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <PomodoroNavbar />

      <div className='radio' style={{ textAlign: 'center', marginTop: '1rem' }}>
        <label>
          <input
            type="radio"
            name="mode"
            checked={workMode}
            onChange={() => resetTimer("work")}
            disabled={isRunning}
          /> Work Mode
        </label>
        &nbsp;&nbsp;
        <label>
          <input
            type="radio"
            name="mode"
            checked={!workMode}
            onChange={() => resetTimer("rest")}
            disabled={isRunning}
          /> Rest Mode
        </label>
      </div>

      <div className='pomodorocontainer'>
        <h1>Pomodoro Timer</h1>

        <div className="clock">
          <div>{minutes.toString().padStart(2, '0')}</div>
          <div>:</div>
          <div>{seconds.toString().padStart(2, '0')}</div>
        </div>

        <h4 style={{ textAlign: 'center' }}>
          {workMode ? "🧠 Work Mode" : "☕ Rest Mode"}
        </h4>

        <div className="button-group-wrapper">
          <div className="button-group">
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handlePause} disabled={!isRunning}>Pause</button>
          </div>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>

        <audio ref={alarmRef} src="/alarm.mp3" preload="auto" />
      </div>
    </>
  );
}
