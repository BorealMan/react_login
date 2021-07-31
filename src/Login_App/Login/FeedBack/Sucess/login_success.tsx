import React from 'react'

const Login_Success = (props: any) => {
    return (
        <div className="sucessfully-logged-in">
            <div className="logged-in-confirmation-container">
                <h3>Sucessfully Logged In</h3>
                <p>Welcome {props.username}</p>
            </div>
        </div>
    )
}

export default Login_Success;
