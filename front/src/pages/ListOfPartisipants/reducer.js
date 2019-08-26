//import usersAction from './action';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:9999"

const items = () => axios.get('/users');

console.log(items());
const initialState = {
    items:  [ {name:"Roma",image:"images/1.png"},{name:"Георгий",image:"images/2.png"},{name:"Лена",image:"images/3.jpg"},{name:"Катя",image:"images/4.jpg"}]
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        default:
            return state;
    }
}