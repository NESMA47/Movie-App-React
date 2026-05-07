export const addToFav=(movie) => {
    return {
        type: "ADD_FAV",
        payload: movie
    };
}
export const removeFromFav=(movieId) => {
    return {
        type: "REMOVE_FAV",
        payload: { id: movieId }
    };
}