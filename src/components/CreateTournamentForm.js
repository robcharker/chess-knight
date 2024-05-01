// CreateTournamentForm.js
import React, { useState, useEffect } from 'react';
import useCreateTournament from '../hooks/useCreateTournament'; // Import the useCreateTournament hook
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker';
import ParticipantsMultiSelect from './ParticipantsMultiSelect';

const CreateTournamentForm = ({ onFormSubmit }) => {
  const [tournamentName, setTournamentName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [participants, setParticipants] = useState('');
  const createTournament = useCreateTournament();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  useEffect(() => {
    // Add Google Places Autocomplete logic here
    // Remember to include the Google Maps script with your API key in your index.html
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tournamentData = {
      tournamentId: Date.now().toString(), // Simple way to generate a unique ID
      name: tournamentName,
      location,
      startDate: startDate.toISOString().split('T')[0],
      participants: selectedParticipants,
    };
    createTournament(tournamentData)
    .then(() => {
      // Call the callback function after successful submission
      if (onFormSubmit) {
        onFormSubmit();
      }
    });
  };

  return (
    <div className="container" style={{margin: "40px 0px"}}>
      <div className="row justify-content-md-left">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formTournamentName" className="form-label">Tournament Name</label>
              <input
                type="text"
                className="form-control"
                id="formTournamentName"
                placeholder="Enter tournament name"
                value={tournamentName}
                onChange={e => setTournamentName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formTournamentLocation" className="form-label">Tournament Location</label>
              <input
                type="text"
                className="form-control"
                id="formTournamentLocation"
                placeholder="Enter tournament location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formTournamentDate" className="form-label d-block">Tournament Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
              />
            </div>
            
            <div>
            <label className="form-label d-block">Participants</label>
              <ParticipantsMultiSelect onParticipantsSelected={setSelectedParticipants}/>
            </div>

            <button type="submit" className="btn btn-primary" style={{marginTop: "40px"}}>Create Tournament</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentForm;
