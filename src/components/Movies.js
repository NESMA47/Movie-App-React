import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useHistory } from 'react-router-dom';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); 
    const[loading, setLoading] = useState(true);
    const history = useHistory();


    useEffect(() => {
        
        const url = searchQuery ? '/search/movie' : '/movie/popular';
        
        axiosInstance.get(url, {
            params: {
                page: currentPage,
                query: searchQuery 
            }
        })
        .then((res) => {
            console.log(res.data.results);
            setMovies(res.data.results);
            setLoading(false);
        })
        .catch((err) => console.log(err));
    }, [currentPage, searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-6 mx-auto">
                    <div className="input-group">
                        <span className="input-group-text bg-danger text-white border-danger">
                            <i className="bi bi-search"></i>
                        </span>
                        <input 
                            type="text" 
                            className="form-control bg-dark text-white border-danger" 
                            placeholder="Search for a movie... text-white" 
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
{loading ? (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="spinner-border text-danger" role="status" style={{ width: '4rem', height: '4rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3 className="ms-3 text-white">Loading Movies...</h3>
            </div>):
                    
                    



            <div className="row row-cols-1 row-cols-md-4 g-4">
                {movies.map((movie) => (
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
}

            <div className="d-flex justify-content-between my-5">
                <button className="btn btn-warning" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>
                <span className="text-white">Page {currentPage}</span>
                <button className="btn btn-warning" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Movies;