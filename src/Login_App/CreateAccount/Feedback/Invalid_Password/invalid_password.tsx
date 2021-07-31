import React from 'react'
import './invalid_password.css'

const invalid_password = () => {
    return (
        <div className='create-account-password-length'>
            Password Must be 3 or more Characters.
        </div>
    );
};

export default invalid_password;
