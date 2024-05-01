import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

const NavigationBar = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);

  // Function to handle dialog open
  const handleOpenSignUpDialog = () => {
    setSignUpDialogOpen(true);
  };

  // Function to handle dialog close
  const handleCloseSignUpDialog = () => {
    setSignUpDialogOpen(false);
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <h1 style={styles.heading}>ChessKnight</h1>
          <div style={styles.buttonRow}>
          <SignInButton user={user} onSignOut={onSignOut} navigate={navigate} />
            <SignUpButton navigate={navigate} />
          </div>
        </div>
      </nav>
      {/* Include the Dialog component and pass the state and handlers */}
    </>
  );
}

const styles = {
  navbar: {
    width: '100%',
    backgroundColor: '#f8f9fa', // Example background color, change as needed
    borderBottom: '1px solid #e7e7e7', // Example border, change as needed
    padding: '10px 0', // Example padding, change as needed
    boxSizing: 'border-box',
  },
  container: {
    // maxWidth: '1140px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px', // Example padding, change as needed
  },
  heading: {
    margin: '0',
    fontSize: '1.5rem', // Example font size, change as needed
    fontWeight: 'bold', // Example font weight, change as needed
  },
  buttonRow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px'
  }
};

export default NavigationBar;
