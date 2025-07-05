import React, { useState, useEffect, useRef } from 'react';
import { PomodoroNavbar } from '../../components/Navbar';

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current!);
              setIsRunning(false);
              return 0;
            } else {
              setMinutes(min => min - 1);
              return 59;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, minutes]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <>
      <PomodoroNavbar />

      <div className='pomodorocontainer'>
        <h1>Pomodoro Timer</h1>

       <div className="clock">
  <div>{minutes.toString().padStart(2, '0')}</div>
  <div>:</div>
  <div>{seconds.toString().padStart(2, '0')}</div>
</div>


        <h4 style={{textAlign:'center'}}>Work Mode</h4>

        <div className='button-group'>
          <button onClick={handleStart} disabled={isRunning}>Start</button>
          <button onClick={handlePause} disabled={!isRunning}>Pause</button> 
         
        </div>
         <button onClick={handleReset} style={{margin:'auto'}} >Reset</button>
      </div>
    </>
  );
}
