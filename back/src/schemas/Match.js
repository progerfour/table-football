import mongoose, {Schema} from 'mongoose';

const MatchSchema = new Schema ({
    id_player1: {
       type: "String",
       required: 'Имя обязательно',
    },
    id_player2: {
        type: "String",
        required: 'Имя обязательно',
     },
    score_p1: mongoose.Number,
    score_p2: mongoose.Number,
    isEnd:{
        type: Boolean,
        default:false
    },
});

const MatchModel = mongoose.model('Match', MatchSchema);

export default MatchModel;