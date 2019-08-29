import { combineReducers } from 'redux';

import users from './pages/ListOfPartisipants/reducer';
import admin from './pages/Admin/reducer';
import match from './pages/Match/reducer';

export default combineReducers({
    users, admin, match
});