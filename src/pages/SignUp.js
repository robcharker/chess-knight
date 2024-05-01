import React from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUp extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
        <h2>Sign Up</h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
