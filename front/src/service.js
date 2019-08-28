import {default as axios} from './axios';
export class Service {
    getUsers() {
        return axios.get(`${axios.defaults.baseURL}/users`)
    }
    deleteUser(id) {
        return axios.delete(`${axios.defaults.baseURL}/users/${id}`)
    }
    
    checkAdmin(login, password) {
        return axios.get(`${axios.defaults.baseURL}/admin/check`,{
            params:{
                login: login,
                password:password
            }
        }); 
    }
}