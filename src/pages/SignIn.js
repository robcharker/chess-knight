import React from 'react';
import SignInForm from '../components/SignInForm'; // Import your SignInForm component

class SignIn extends React.Component {
    render() {
        return (
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <SignInForm onClose={this.handleCloseForm} />
            </div>
        );
    }

    handleCloseForm = () => {
        // Logic to handle closing the sign-in form, 
        // e.g., navigate to another page or close a modal
        this.props.navigate('/'); // Example: navigate to the home page after sign-in
    };
}

export default SignIn;
