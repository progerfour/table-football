var userReducer = function(state, action) {
    if (state === undefined) {
      state = [];
    }
    switch (action.type) {
    case action.typ === "ADD_USER":
        state.push(action.user);
    break;
    default:
        console.log("This comand does not exist");
    }
    return state;
}
export default userReducer;