import React, { useState, useEffect } from 'react';
import { Breadcrumb, ListGroup, Button } from 'react-bootstrap';
import { ArrowBack, FileDownload } from '@mui/icons-material';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import LeftNav from '../components/LeftNav';
import CreateTournamentForm from '../components/CreateTournamentForm';
import "../styles/AppLayoutStyles.css";
import useAdminCheck from '../hooks/useAdminCheck';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { isAdmin, loading } = useAdminCheck();

  const handleFormSubmit = () => {
    setShowCreateForm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide the toast after 3 seconds
  };
  

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'tournaments'), (snapshot) => {
      const tournamentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTournaments(tournamentsData);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const selectTournament = (tournament) => {
    setSelectedTournament(tournament);
  };

  const goBackToTournaments = () => {
    setSelectedTournament(null);
  }; 

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm); 
  };

  return (
    <div className="d-flex">
      <LeftNav/>

      {showToast && (
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 5 }}>
        <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <small>Just now</small>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)} aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Tournament created successfully!
          </div>
        </div>
      </div>
    )}

      <div className="main-content">
        <Breadcrumb>
        <Breadcrumb.Item active={!selectedTournament}>Tournaments</Breadcrumb.Item>
        {selectedTournament && <Breadcrumb.Item active>{selectedTournament.name}</Breadcrumb.Item>}
      </Breadcrumb>

      {selectedTournament ? (
        <div>
        {/* Display selected tournament information here */}
        <div>
          <h3>{selectedTournament.name}</h3>
          <p><strong>Location:</strong> {selectedTournament.location}</p>
          <p><strong>Start Date:</strong> {new Date(selectedTournament.startDate.seconds * 1000).toDateString()}</p>
          <p><strong>End Date:</strong> {new Date(selectedTournament.endDate.seconds * 1000).toDateString()}</p>
          <p><strong>Status:</strong> {selectedTournament.status}</p>
          <p><strong>Time Control:</strong> {selectedTournament.timeControl}</p>
        </div>
        <Button variant="outline-secondary" onClick={goBackToTournaments}>
          <ArrowBack /> Back
        </Button>
        <Button variant="outline-primary" className="float-right">
              <FileDownload /> Download
            </Button>
          </div>
        ) : showCreateForm ? (
          <div>
            <CreateTournamentForm onFormSubmit={handleFormSubmit}/>
            <Button onClick={toggleCreateForm} variant="outline-secondary">Cancel</Button>
          </div>
        ) : (
          <div className="list-group-container">
                    {isAdmin && !loading && (
         <Button onClick={toggleCreateForm} variant="primary" style={{margin: "20px 0px "}}>New Tournament</Button>
        )}
            <ListGroup>
              {tournaments.map(tournament => (
                <ListGroup.Item key={tournament.id} action onClick={() => selectTournament(tournament)} className="list-group-item">
                  {tournament.name}
                  <Button variant="outline-primary">
                    <FileDownload /> 
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;