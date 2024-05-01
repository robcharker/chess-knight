import React from 'react';

class SignInButton extends React.Component {
  handleAuthAction = () => {
    if (this.props.user) {
      // Sign out if user is signed in
      this.props.onSignOut();
    } else {
      // Navigate to sign in if user is signed out
      this.props.navigate('/SignIn');
    }
  };

  render() {
    const buttonText = this.props.user ? 'Sign Out' : 'Sign In';
    return (
      <button onClick={this.handleAuthAction}>{buttonText}</button>
    );
  }
}

export default SignInButton;
