import axiosInstance from "../axiosConfig";export const addToFav=(movie) => {
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

export const getMovieList = (page = 1 ,searchQuery="") => (dispatch) => {
const url = searchQuery ? '/search/movie' : '/movie/popular';   

 return axiosInstance.get(url, {
        params: {
            page: page,
            query: searchQuery
        }
    }) 
    .then((response) => {
        dispatch({
            type: "SET_MOVIES",
            payload: response.data.results
        });
    })
    .catch((error) => {
        console.error("Error fetching movies:", error);
    });
};