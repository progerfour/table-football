const initialState ={ 
    items: [],
    loading: true
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case "USER_LOADED":{
            return {
                items: payload,
                loading: false,
            }
        }
        default:
            return state;
    }
}
