import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axiosInstance from '../axiosConfig';
function MovieDetails() {
    const { id } = useParams(); 
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axiosInstance.get(`/movie/${id}`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div className="container mt-5 text-white">
            <div className="row">
                <div className="col-md-4">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        className="img-fluid rounded shadow" 
                        alt={movie.title} 
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="display-4">{movie.title}</h1>
                    <p className="lead text-info">{movie.tagline}</p>
                    <hr className="bg-secondary" />
                    <h5>Overview:</h5>
                    <p>{movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;