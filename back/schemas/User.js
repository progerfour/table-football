import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema ({
    name: String,
    avatar: String,
    isAdmin:Boolean
},{
    timestamps:true
});

const User = mongoose.model('User', UserSchema);

export default User;