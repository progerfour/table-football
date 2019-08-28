import mongoose, {Schema} from 'mongoose';

const AdminSchema = new Schema ({
    login: {
       type: String,
       required: 'true',
    },
    password : {
        type: String,
        required:'true'
    }
});

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;