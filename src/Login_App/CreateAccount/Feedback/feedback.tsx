import './feedback.css'
import Invalid_Password from './Invalid_Password/invalid_password'
import Invalid_Username from './Invalid_Username/invalid_username'
import Sucess from './Sucess/sucess'
import ACCOUNT_STATUS from '../../enum/create_account_enum'

export const Feedback = (props: any) => {
    if (props.status === ACCOUNT_STATUS.not_submitted){
        return (
            <div className='create-account-feedback'>
                
            </div>
        );
    }
    else if (props.status === ACCOUNT_STATUS.accepted) {
        return (
            <div className='create-account-feedback'>
                <Sucess username={props.username}/>
            </div>
        );
    }
    else if (props.status === ACCOUNT_STATUS.invalid_username_already_exists) {
        return (
            <div className='create-account-feedback'>
                <Invalid_Username />
            </div>
        );
    }
    else if (props.status === ACCOUNT_STATUS.invalid_password_length) {
        return (
            <div className='create-account-feedback'>
               <Invalid_Password />
            </div>
        );
    }
    else {
        return (
            <div>I Work Atleast...</div>
        )
    }
};

export default Feedback;
