import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema ({
    name: {
       type: String,
       required: 'Имя обязательно',
      index: { unique:true}
    },
    avatar: String,
    isAdmin:{
        type: Boolean,
        default:false
     },
},{
    timestamps:true
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;