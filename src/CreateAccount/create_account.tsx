import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './create_account.css'
import ACCOUNT_STATUS from '../enum/create_account_enum'

function Create_Account(props: any) {

    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [account_status, set_account_status] = useState(ACCOUNT_STATUS.not_submitted);

    const handle_submit = async () => {
        if (username === '' || password === ''){
            return
        }
        await axios.post(`${props.api}/auth/create-account`, {username: username, password: password}).then((res) => {
            console.log(res.data)

            if (res.data === 'Sucessfully Registered') {
                set_account_status(ACCOUNT_STATUS.accepted);
                return <Redirect from='/create-account' to='/' />
            } 
            else if (res.data === 'User Already Exists'){
                set_account_status(ACCOUNT_STATUS.invalid_username_already_exists);
            }
            else if (res.data === 'Password To Short'){
                set_account_status(ACCOUNT_STATUS.invalid_password_length);
            }
        });
    };

    useEffect(() => {
        console.log(account_status)
        if (account_status === ACCOUNT_STATUS.accepted){
            console.log("I ran")
            window.location.href = "/"
        }
    }, [account_status])

    return (
        <div className='create-account-container'>
            <div className='create-account'>
                <div>
                <h3>Welcome Guest!</h3>
                <p>Please fill out the form below to create an account of your own!</p>
                </div>
                <div className='create-account-form'>
                    <div>
                        <label className='create-account-form-label'>Username</label>
                        <input type='text' onChange={(e) => {set_username(e.target.value)}} className='create-account-form-input'></input>
                    </div>
                    <div>
                        <label className='create-account-form-label'>Password</label>
                        <input type='password' onChange={(e) => {set_password(e.target.value)}} className='create-account-form-input'></input>
                    </div>
                    <button className='create-account-button' onClick={() => handle_submit()}>Create Account</button>
                </div>
            </div>
        </div>
    );
};

export default Create_Account;
