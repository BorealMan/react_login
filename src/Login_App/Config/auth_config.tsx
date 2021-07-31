
export class Auth_Config {
    username: string = ""
    api: any = {
        local: "http://localhost:4000",
        prod: "http://10.0.0.11:4000"
    }
    jwt: any = {
        auth_token: {
            token: "",
            issued: 0,
            expires: 0
        },
        refresh_token: {
            token: "",
            issued: 0,
            expires: 0
        }
    }
    constructor() {
    
    }
    set_jwt_auth_token_expires(expires: number) {
        this.jwt.auth_aoktn.expires = expires
    }
    get_jwt_auth_token_expires() {
        return this.jwt.auth_token.expires
    }
    set_jwt_refresh_expires(expires: number) {
        this.jwt.refresh_token.expires = expires
    }
    get_jwt_refresh_expires() {
        return this.jwt.refresh_token.expires
    }
    set_jwt_refresh_issued(issued: number){
        this.jwt.refresh_token.issued = issued
    }
    get_jwt_refresh_issued() {
        return this.jwt.refresh_token.issued
    }
    set_jwt_auth_issued(issued: number) {
        this.jwt.auth_token.issued = issued 
    }
    get_jwt_auth_issued() {
        return this.jwt.auth_token.issued
    }
    set_jwt_refresh(token: string) {
        this.jwt.refresh_token.token = token
    }
    get_jwt_refresh() {
        return this.jwt.refresh_token.token
    }
    set_jwt_auth(token: string){
        this.jwt.auth_token.token = token
    }
    get_jwt_auth() {
        return this.jwt.auth_token.token
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
    print_session_details(){
        console.log(`Username: ${this.username}\n`)
    }
};


export default Auth_Config;