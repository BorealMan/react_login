import Jwt_Token from './JtwToken/jwt_token'

export class Auth_Config {
    username: string = ""
    login_status: boolean = false
    api: any = {
        local: "http://localhost:4000",
        prod: "http://10.0.0.17:4000"
    }
    auth_token: Jwt_Token 
    refresh_token: Jwt_Token
    upTime: number = 0
    constructor() {
        this.auth_token = new Jwt_Token();
        this.refresh_token = new Jwt_Token();
    }
    get_refresh_token() {
        return this.refresh_token
    }
    get_auth_token() {
        return this.auth_token
    }
    get_local_api() {
        return this.api.local
    }
    get_prod_api() {
        return this.api.prod
    }
    set_username(username: string) {
        this.username = username
    }
    get_username() {
        return this.username
    }
    print_session_details() {
        console.log(`Username: ${this.username}\n`)
        this.auth_token.print_token()
        this.refresh_token.print_token()
    }
    clear_session() {
        this.auth_token.reset_token()
        this.refresh_token.reset_token()
        this.username = ""
    }
    set_login_status(b: boolean) {
        this.login_status = b
    }
    get_login_status() {
        return this.login_status
    }
};


export default Auth_Config;