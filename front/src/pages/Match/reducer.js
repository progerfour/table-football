const initialState ={ 
    game:  {
      },
    loading: true
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case "MATH_LOADED": {
            return {
                ...state,
                game:payload
            }
        }
        case "SCORE_LOADED": {
            return {
                ...state,
                game: {
                ...state.game,
                "isEnd":payload.isEnd,
                "score_p1": payload.score_p1,
                "score_p2": payload.score_p2  
                }
            }
        }
        default:
            return state;
    }
}
