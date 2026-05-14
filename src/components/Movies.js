import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, removeFromFav, getMovieList } from '../Redux/FavAction';

function Movies() {
    const movies = useSelector((state) => state.movies);
    const favorites = useSelector((state) => state.fav);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // متغير البحث
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        // بنبعت الـ page والـ searchQuery للأكشن بتاع الـ Thunk
        dispatch(getMovieList(currentPage, searchQuery))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [currentPage, searchQuery, dispatch]); // الـ Effect هيشتغل لما البحث يتغير

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // بنرجع للصفحة الأولى مع كل بحث جديد
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
        <div className="container mt-4">
            {/* 1. رجعنا الـ Search Input هنا */}
           <div className="row mb-4 justify-content-center">
    <div className="col-md-6">
        <div className="input-group">
            {/* أيقونة البحث */}
            <span className="input-group-text bg-dark border-secondary text-secondary">
                <i className="bi bi-search"></i>
            </span>
            
            {/* الـ Input بتاع السيرش */}
            <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary shadow-none" 
                placeholder="Search for a movie..." 
                value={searchQuery}
                onChange={handleSearch} 
            />
        </div>
    </div>
</div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <div className="spinner-border text-danger" role="status"></div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {movies && movies.map((movie) => {
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
                                        ></button>
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