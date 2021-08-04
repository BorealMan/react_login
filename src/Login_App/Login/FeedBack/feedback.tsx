import './feedback.css'
import LOGIN_STATE from '../../enum/login_enum'
import Sucess from './Sucess/login_success'
import Invalid_Password from './Invalid_Password/invalid_password'
import Invalid_Username from './Invalid_Username/invalid_username'
import Input_Required from './Input_Required/input_required'
import Already_Logged_In from './Already_Logged_In/Input_Required/already_logged_in'

const Feedback = (props: any) => {
    if (props.status === LOGIN_STATE.not_logged_in) {
        return (
            <div></div>
        );
    }
    else if (props.status === LOGIN_STATE.invalid_password) {
        return (
            <div><Invalid_Password /></div>
        );
    } 
    else if (props.status === LOGIN_STATE.logged_in) {
        return (
            <div><Sucess username={props.username}/></div>
        );
    }
    else if (props.status === LOGIN_STATE.invalid_username){
        return (
            <div>
                <Invalid_Username />
            </div>
        );
    }
    else if (props.status === LOGIN_STATE.input_required){
        return (
            <Input_Required />
        )
    }
    else if (props.status === LOGIN_STATE.user_logged_in){
        return (
            <Already_Logged_In />
        )
    }
    else {
        return (
            <div>Unknown Error Occured</div>
        );
    };
};

export default Feedback;
