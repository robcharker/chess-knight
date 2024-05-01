import React from 'react';
import UserProfile from '../components/UserProfile';
import LeftNav from '../components/LeftNav';
import ChessComConnect from '../components/ChessComConnect'
import "../styles/AppLayoutStyles.css";

const Profile = () => {
  return (
    <div className="d-flex">
      <LeftNav />
      <div className="main-content">
        <h1>Profile</h1>
        <div className="row" > {/* Use row to contain columns */}
          <div className="col-md-6" style={{margin: "0px 0px"}}> {/* Half width for med ium to large screens */}
            <UserProfile />
          </div>
          <div className="col-md-6"> {/* Half width for medium to large screens */}
            <ChessComConnect />
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default Profile;
