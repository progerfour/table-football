import { combineReducers } from 'redux';

import users from './pages/ListOfPartisipants/reducer';
import auth from './pages/Auth/reducer';

export default combineReducers({
    users,auth
});