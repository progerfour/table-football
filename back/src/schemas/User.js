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
    win: {
        type: mongoose.Number,
        deafult: 0
    },
    wasted: {
        type: mongoose.Number,
        deafult: 0
    },
    isPlayer: {
        type: Boolean,
        default:true
    }
},{
    timestamps:true
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;