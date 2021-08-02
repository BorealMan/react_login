import Timer from './Timer/timer'
import Jwt_Token from './JtwToken/jwt_token'

export class Auth_Config {
    username: string = ""
    api: any = {
        local: "http://localhost:4000",
        prod: "http://10.0.0.11:4000"
    }
    auth_token: Jwt_Token 
    refresh_token: Jwt_Token
    sessionTimer: Timer
    constructor() {
        this.sessionTimer = new Timer;
        this.auth_token = new Jwt_Token();
        this.refresh_token = new Jwt_Token();
    }
    get_refresh_token() {
        return this.refresh_token
    }
    get_auth_token() {
        return this.auth_token
    }
    get_session_timer() {
        return this.sessionTimer
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
        this.sessionTimer.print_timer()
        this.auth_token.print_token()
        this.refresh_token.print_token()
    }
    clear_session() {
        this.auth_token.reset_token()
        this.refresh_token.reset_token()
        this.username = ""
        this.sessionTimer.stop_timer()
    }
    start_session() {
        this.sessionTimer.start_timer()
    }
};


export default Auth_Config;