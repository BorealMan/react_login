import React from 'react'
import './invalid_username.css'

export const Invalid_Username = () => {
    return (
        <div className='create-account-invalid-username'>
            <div>
                <p className='create-account-invalid-username-message' color='red'>Username Already Exists</p>
            </div>
 
        </div>
    );
};

export default Invalid_Username;
