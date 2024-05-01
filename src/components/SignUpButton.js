import React from 'react';

class SignUpButton extends React.Component {
  handleSignUp = () => {
    // Navigate to sign up page
    this.props.navigate('/SignUp');
  };

  render() {
    return (
      <button onClick={this.handleSignUp}>Sign Up</button>
    );
  }
}

export default SignUpButton;
