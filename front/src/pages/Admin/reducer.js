const initialState = {
    isAdmin: false
};

export default (state = initialState, action) => {
    const {type,payload} = action;
    switch (type) {
        case "ADMIN_ENTERED":
            return {
                isAdmin:payload
            }
        default:
            return state;
    }
}