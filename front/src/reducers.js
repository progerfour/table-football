import { combineReducers } from 'redux';

import users from './pages/ListOfParticipants/reducer';
import admin from './pages/Admin/reducer';
import match from './pages/Match/reducer';

export default combineReducers({
    users, admin, match
});