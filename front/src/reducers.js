import { combineReducers } from 'redux';

import users from './pages/ListOfPartisipants/reducer';
import admin from './pages/Admin/reducer';

export default combineReducers({
    users,admin
});