import mongoose, {Schema} from 'mongoose';

const AvatarSchema = new Schema ({
    login: {
       type: String,
       required: 'true',
    },
    
});

const AvatarModel = mongoose.model('Avatar', AvatarSchema);

export default AvatarModel;