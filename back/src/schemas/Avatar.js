import mongoose, {Schema} from 'mongoose';

const AvatarSchema = new Schema ({
    number: {
       type: Number,
    },
});

const AvatarModel = mongoose.model('Avatar', AvatarSchema);

export default AvatarModel;