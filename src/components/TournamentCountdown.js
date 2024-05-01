import React, { useState, useEffect } from 'react';


const TournamentCountdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference <= 0) {
        setCountdown('00:00:00:00');
        clearInterval(interval);
        return;
      }

      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      days = days < 10 ? '0' + days : days;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      setCountdown(`${days}d : ${hours}hr : ${minutes}min : ${seconds}sec`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-left mt-5" style={{ maxWidth: '500px', margin: '0 0' }}>
      <h5>
        Next Tournament in: <span className="badge bg-light text-dark">{countdown}</span>
      </h5>
    </div>
  );
  
};

export default TournamentCountdown;
