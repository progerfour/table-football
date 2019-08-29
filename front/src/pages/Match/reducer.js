const initialState ={ 
    game:  {
        "player1":{
          "name":"Лена"
        },
        "player2":{
          "name":"Катя"
        },
        "score":{
          "player1":4,
          "player2":3
        } 
      },
    loading: true
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        default:
            return state;
    }
}
