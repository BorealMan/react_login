import React from 'react'

const Sucess = (props: any) => {
    return (
        <div className='create-account-sucess'>
            <h3>Sucessfully Created Account </h3>
            <p>Welcome {props.username}</p>
        </div>
    );
};

export default Sucess;
