
import React from 'react';
import LeftNav from '../components/LeftNav';
import TournamentCountdown from '../components/TournamentCountdown';
import "../styles/AppLayoutStyles.css";

const AppHome = () => {
  return (
    <div className="d-flex">
      <LeftNav/>
      <div className="main-content">
      <h1>Welcome to ChessKnight!</h1>
      
      <TournamentCountdown targetDate="2023-12-25T17:00:00Z" />
      </div>
    </div>
  );
};

export default AppHome;
 