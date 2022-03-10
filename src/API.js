import axios from "axios";

export default class API {
    static URL='https://api-sms-gw.playcus.com/api'

    static getToken(){
        return localStorage.getItem('token')
    }
    static isLoggedIn(){
        const loggedIn=localStorage.getItem('token')
        return loggedIn != null;
    }
    static setToken(val){
        return localStorage.setItem('token',val)
    }
    static setLoggedOut(){
        localStorage.setItem('token',null)
    }

    static async getContent(path) {
        console.log("get "+this.URL+path)
        return await axios.get(this.URL + path, {});
    }
    static async postContent(path,data) {
        console.log("post "+this.URL+path)
        return await axios.post(this.URL + path, data, {});
    }

    static login(user,password,onSuccess,onFailure){
        const account={
            "number": user,
            "id": null,
            "password": password
        }
        const response=API.postContent("/account/login",account)
        response.then((value)=>{
            this.setToken(value.data.hash)
            onSuccess()
        },(reason)=>{
            onFailure()
        })
    }
}
