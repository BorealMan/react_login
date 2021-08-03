import LoginAPI from './Login_API/login_api'

class API {
    login_api: any = null
    constructor(){
        this.login_api = new LoginAPI()
    }
    loginAPI() {
        return this.login_api
    }
}


const api = new API
export default api