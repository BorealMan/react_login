import axios from 'axios'
import Session from '../../Config/session'

const api = Session.get_prod_api()

export class LoginAPI {

    async login(username: string, password: string) {
        try {
            return await axios.post(`${api}/auth/login`, {username: username, password: password})
        } catch (err) {
            return err
        }
    };

    async create_account(username: string, password: string) {
        try{
            return await axios.post(`${api}/auth/create-account`, {username: username, password: password})
        } catch (err) {
            return err
        }
    };

    async validate_auth_token() {
        try {
            return axios.get(`${Session.get_local_api()}/auth/check-token`, 
            {headers: {Authorization: `Bearer ${Session.get_auth_token().get_token()}`}})
        } catch (err) {
            return err
        }
    };

    async refresh_accessToken() {
        try {
            axios.get(`${Session.get_local_api()}/auth/refresh-access-token`,
             {headers: {authorization: `Bearer ` + Session.get_refresh_token().get_token()}})
             .then(res => {
                if (res.data.jwt === undefined){
                    Session.get_auth_token().set_token("")
                    Session.get_refresh_token().set_token("")
                }
                else {
                    Session.get_auth_token().set_token(res.data.jwt.auth_token)
                }
            })
            return
        } catch (err) {
            return err
        }
    };

    async refresh_refreshToken() {
        try {
            axios.get(`${Session.get_local_api()}/auth/refresh-refresh-token`,
             {headers: {authorization: `Bearer ` + Session.get_refresh_token().get_token()}})
             .then(res => {
                if (res.data.jwt === undefined){
                    // console.log("error occured...")
                }
                else {
                    Session.get_refresh_token().set_token(res.data.jwt.auth_token)
                    console.log("Got a new refresh token and stored it in a safe place")
                    Session.print_session_details()
                }
            })
            return
        } catch (err) {
            return err
        }
    };

};

export default LoginAPI 