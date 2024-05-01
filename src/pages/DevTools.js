import React, { useState } from "react";
import LeftNav from "../components/LeftNav";
import useDeleteAllUsers from "../hooks/useDeleteAllUsers"; // Import the hook
import useDeleteAllTournaments from "../hooks/useDeleteAllTournaments"; // Import the hook
import useCreateMockUsers from "../hooks/useCreateMockUsers";
import "../styles/AppLayoutStyles.css";

const DevTools = () => {
  const deleteAllUsers = useDeleteAllUsers();
  const deleteAllTournaments = useDeleteAllTournaments();
  const createMockUsers = useCreateMockUsers();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDeleteAllUsers = () => {
    if (window.confirm("Are you sure you want to delete all users?")) {
      deleteAllUsers();
      setAlertMessage("All users have been deleted.");
      setShowAlert(true);
    }
  };

  const handleDeleteAllTournaments = () => {
    if (window.confirm("Are you sure you want to delete all tournaments?")) {
      deleteAllTournaments();
      setAlertMessage("All tournaments have been deleted.");
      setShowAlert(true);
    }
  };

  const handleCreateMockUsers = () => {
    if (window.confirm("Are you sure you want to create 20 mocked users?")) {
      createMockUsers();
      setAlertMessage("20 mocked users have been created.");
      setShowAlert(true);
    }
  };

  return (
    <div className="d-flex">
      <LeftNav />
      <div className="main-content">
        <h1>Don't Touch, These Things Are Dangerous 🙏</h1>

        {showAlert && (
          <div className="alert alert-success" role="alert">
            {alertMessage}
          </div>
        )}

        <div className="d-grid gap-2" style={{ maxWidth: "150px" }}>
          <button
            className="btn btn-danger mb-2"
            type="button"
            style={{ width: "150px" }}
            onClick={handleDeleteAllUsers}
          >
            Delete all users
          </button>
          <button
            className="btn btn-danger mb-2"
            type="button"
            style={{ width: "150px" }}
            onClick={handleDeleteAllTournaments}
          >
            Delete all tournaments
          </button>
          <button
            className="btn btn-danger mb-2"
            type="button"
            style={{ width: "150px" }}
          >
            Delete all tournaments
          </button>
          <button
            className="btn btn-warning mb-2"
            type="button"
            style={{ width: "150px" }}
            onClick={handleCreateMockUsers}
          >
            Backfill with 20 users
          </button>
          <button
            className="btn btn-warning"
            type="button"
            style={{ width: "150px" }}
          >
            Backfill with 20 tournaments
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevTools;
