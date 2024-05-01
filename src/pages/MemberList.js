
import React from 'react';
import LeftNav from '../components/LeftNav';
import ListOfMembers from '../components/ListOfMembers';
import "../styles/AppLayoutStyles.css";

const MemberList = () => {
  return (
    <div className="d-flex">
      <LeftNav/>
      <div className="main-content">
      <h1>A list of all members.</h1>
      
      <ListOfMembers />
      </div>
    </div>
  );
};

export default MemberList;
 