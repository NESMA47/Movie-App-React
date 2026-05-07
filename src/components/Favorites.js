import React from 'react';
import { addToFav, removeFromFav } from '../Redux/FavAction';
import{useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.fav);
    const history = useHistory();
    return (
        <div className="container mt-4 text-white">
            <h2 className="mb-4">My Favorites ({favorites.length})</h2>
            
            {favorites.length === 0 ? (
                <div className="text-center py-5">
                    <h3>No movies added to favorites yet!</h3>
                    <button className="btn btn-warning mt-3" onClick={() => history.push('/movies')}>
                        Go back to Movies
                    </button>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {favorites.map((movie) => (
                        <div className="col" key={movie.id}>
                            <div className="card h-100 bg-dark text-white border-secondary">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                                    className="card-img-top" 
                                    alt={movie.title} 
                                />
                                <div className="card-body">
                                    <h6 className="card-title text-truncate">{movie.title}</h6>
                                    
                                    <button 
                                        className="btn btn-danger btn-sm w-100 mt-2"
                                        onClick={() => dispatch(removeFromFav(movie.id))} 
                                        
                                    >
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
        </div>
    );
}

export default Favorites;