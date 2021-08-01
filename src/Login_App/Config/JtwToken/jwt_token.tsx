

export class Jwt_Token{
    token:   string = ""
    issued:  number = 0
    expires: number = 0
    constructor(){

    };
    get_token() {
        return this.token;
    }
    get_issued() {
        return this.issued;
    }
    get_expires() {
        return this.expires;
    }
    set_token(token: string) {
        this.token = token;
    }
    set_issued(issued: number) {
        this.issued = issued;
    }
    set_expires(expires: number) {
        this.expires = expires;
    }
    print_token() {
        console.log(`Token: ${this.token}\nIssued: ${this.issued}\nExpires: ${this.expires}`)
    }
};

export default Jwt_Token;