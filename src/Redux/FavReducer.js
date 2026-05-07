const INITIAL_STATE = {
    fav: []
}

 const FavReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case "ADD_FAV":
            return {
                ...state,
                fav: [...state.fav, action.payload]
            }
        case "REMOVE_FAV":
            return {
                ...state,
                fav: state.fav.filter(movie => movie.id  !== action.payload.id)
            }
        default:
            return state;
    }
}
export default FavReducer;
