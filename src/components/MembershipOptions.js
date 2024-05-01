import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MembershipOptions = () => {
  const [selectedOption, setSelectedOption] = useState('pay-per-tournament');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Custom style for the card container
  const cardContainerStyle = {
    display: 'flex',
    gap: '20px', // sets the gap between cards
  };

  // Custom style for the cards to prevent growing beyond 250px
  const cardStyle = {
    maxWidth: '250px',
    flex: '0 0 auto', // prevents the cards from growing
  };

  return (
    <div className="container mt-4" style={{ margin: '0 0', padding: '20px 0px' }}>
      <div className="row">
        <div className="col" style={cardContainerStyle}> {/* Inline styles for left alignment and gap */}
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <input
                type="radio"
                name="membershipOption"
                value="pay-per-tournament"
                checked={selectedOption === 'pay-per-tournament'}
                onChange={handleRadioChange}
                className="card-radio-input"
              />
              <h5 className="card-title">Pay per Tournament</h5>
              <p className="card-text">$19.99 per tournament</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Select</button>
            </div>
          </div>
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <input
                type="radio"
                name="membershipOption"
                value="unlimited-tournaments"
                checked={selectedOption === 'unlimited-tournaments'}
                onChange={handleRadioChange}
                className="card-radio-input"
              />
              <h5 className="card-title">Unlimited Tournaments</h5>
              <p className="card-text">$34.99 / month</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Select</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipOptions;
