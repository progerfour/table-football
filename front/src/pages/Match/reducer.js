const initialState ={ 
    game:  {
        avatar1: "6.jpg",
        avatar2: "5.jpg",
        id_player1: "5d67fbcb33c5b11098f36e2e",
        id_player2: "5d67fbc733c5b11098f36e2d",
        isEnd: false,
        name1: "Алла",
        name2: "Элиза",
        score_p1: 0,
        score_p2: 0,
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
        default:
            return state;
    }
}
