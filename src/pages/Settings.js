
import React from 'react';
import LeftNav from '../components/LeftNav';
import MembershipOptions from '../components/MembershipOptions';
import PaymentMethodComponent from '../components/PaymentMethodForm';
import "../styles/AppLayoutStyles.css";

const Settings = () => {
  return (
    <div className="d-flex">
      <LeftNav/>
      <div className="main-content">
        <h1>Settings</h1>
        <MembershipOptions/>
        <PaymentMethodComponent/>
      </div>
    </div>
  );
};

export default Settings;
 