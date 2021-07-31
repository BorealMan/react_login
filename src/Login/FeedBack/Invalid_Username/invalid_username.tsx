import React from 'react'
import './invalid_username.css'

const Invalid_Username = () => {
    return (
        <div className='invalid-username-error'>
            <div className='invalid-username-container'>
                <p className='invalid-username-message'>Invalid Username</p>
                {/* <button onClick={() => {window.location.reload()}}>Continue</button> */}
            </div>
        </div>
    );
};

export default Invalid_Username;
