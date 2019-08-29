const initialState = {
    isAdmin: false
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case "ADMIN_UPDATE":
            return {
                isAdmin:payload
            }
        default:
            return state;
    }
}