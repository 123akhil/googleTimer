import React, { useState, useEffect } from "react";
import "./styles.css";

function Timer() {
  const [initialTime, setInitialTime] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          setRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, time]);

  const startTimer = () => {
    setRunning(true);
    setToggle(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);
    setTime(initialTime);
  };

  const handleInputChange = (event) => {
    setInitialTime(parseInt(event.target.value, 10));
    setTime(parseInt(event.target.value, 10));
  };

  return (
    <div className="timer">
      <h2 className="heading">Countdown Timer</h2>
      {toggle ? (
        <input
          className="input"
          type="number"
          value={time}
          readOnly
          onClick={() => setToggle(false)}
        />
      ) : (
        <input
          className="input"
          type="number"
          placeholder="Enter Time "
          onChange={handleInputChange}
          value={initialTime}
        />
      )}

      <div className="timer-controls">
        {running ? (
          <button className="button" onClick={stopTimer}>
            Stop
          </button>
        ) : (
          <button className="button" onClick={startTimer}>
            Start
          </button>
        )}
        <button className="button" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
