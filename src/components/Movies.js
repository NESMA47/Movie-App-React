import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav } from '../Redux/FavAction';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.fav);

    useEffect(() => {
        setLoading(true);
        const url = searchQuery ? '/search/movie' : '/movie/popular';
        
        axiosInstance.get(url, {
            params: { page: currentPage, query: searchQuery }
        })
        .then((res) => {
            setMovies(res.data.results);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [currentPage, searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const toggleFavorite = (movie) => {
        const isAlreadyFav = favorites.some((fav) => String(fav.id) === String(movie.id));

        if (isAlreadyFav) {
            dispatch(removeFromFav(movie.id));
        } else {
            dispatch(addToFav(movie)); 
        }
    };

    return (
        <div className="container">
            
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border text-danger" role="status"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {movies.map((movie) => {
                        const isFav = favorites.some((fav) => String(fav.id) === String(movie.id));

                        return (
                            <div className="col" key={movie.id}>
                                <div className="card h-100 bg-dark text-white border-secondary shadow">
                                    <img 
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} 
                                        className="card-img-top" 
                                        alt={movie.title} 
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title text-truncate">{movie.title}</h6>
                                        <button 
                                            className="btn btn-outline-danger btn-sm w-100" 
                                            onClick={() => history.push(`/movie-details/${movie.id}`)}
                                        >
                                            Details
                                        </button>
                                        
                                         <button 
    className={`bi ${isFav ? 'bi-heart-fill text-danger' : 'bi-heart text-white'} position-absolute top-0 end-0 m-2 border-0 bg-transparent`}
    onClick={() => toggleFavorite(movie)} 
    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
>
</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Movies;