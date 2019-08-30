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
        default:
            return state;
    }
}
