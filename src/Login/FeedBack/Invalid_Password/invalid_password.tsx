import React from 'react'
import './invalid_password.css'

const Invalid_Password = () => {
    return (
        <div className='failed-login'>
            <div className='failed-container'>
                <p className='invalid-password-message'>Invalid Password</p>
                {/* <button onClick={() => {window.location.reload()}}>Continue</button> */}
            </div>
        </div>
    )
}

export default Invalid_Password;