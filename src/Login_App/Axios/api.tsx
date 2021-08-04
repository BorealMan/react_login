import LoginAPI from './Login_API/login_api'
import Session from '../Config/session'

class API {
    login_api: any = null
    api: any = null
    constructor(){
        this.api = Session.get_local_api()
        this.login_api = new LoginAPI(this.api)
    }
    loginAPI() {
        return this.login_api
    }
}


const api = new API
export default api