import React, { useState } from 'react';

function ChessComConnect() {
  const [username, setUsername] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchPlayerData = async (username) => {
    const profileResponse = await fetch(`https://api.chess.com/pub/player/${username}`);
    const profileData = await profileResponse.json();

    const statsResponse = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
    const statsData = await statsResponse.json();

    return { profileData, statsData };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { profileData, statsData } = await fetchPlayerData(username);
      // Convert timestamps to human-readable format for profile data
      if (profileData.joined) profileData.joined = new Date(profileData.joined * 1000).toLocaleDateString();
      if (profileData.last_online) profileData.last_online = new Date(profileData.last_online * 1000).toLocaleDateString();

      setPlayerData(profileData);
      setPlayerStats(statsData);
      setError(null);
    } catch (e) {
      setError(e.message);
      setPlayerData(null);
      setPlayerStats(null);
    }
  };

  // Helper function to render stats data
  const renderStatsData = (stats) => {
    return Object.entries(stats).map(([key, stat]) => {
      // Convert timestamps within stats
      if (stat.last && stat.last.date) {
        stat.last.date = new Date(stat.last.date * 1000).toLocaleDateString();
      }
      if (stat.best && stat.best.date) {
        stat.best.date = new Date(stat.best.date * 1000).toLocaleDateString();
      }
      
      return (
        <tr key={key}>
          <td><strong>{key.replace(/_/g, ' ')}</strong></td>
          <td>
            {Object.entries(stat).map(([statKey, statValue]) => (
              <div key={statKey}>
                {statKey}: {typeof statValue === 'object' ? JSON.stringify(statValue) : statValue}
              </div>
            ))}
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h6>Please enter your Chess.com username below to load your stats</h6>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter Username" />
        <button type="submit">Submit</button>
        <button type="submit">Yep, that is me.</button>
      </form>
      {error && <p>Error fetching data: {error}</p>}
      {playerData && (
        <div>
          <img src={playerData.avatar} alt={`${username}'s avatar`} width="50" height="50" />
          <table>
            <thead>
              <tr>
                <th>Profile Information</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(playerData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {playerStats && (
            <table>
              <thead>
                <tr>
                  <th>Stats Information</th>
                </tr>
              </thead>
              <tbody>
                {renderStatsData(playerStats)}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ChessComConnect;
