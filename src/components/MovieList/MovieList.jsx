import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {useHistory} from 'react-router-dom'

function MovieList() {
    const history= useHistory();

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    const bookdetails = (movie)=>{
        
        history.push(`/Details/${movie.id}`)
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            {console.log('movie array is',movies)}
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} onClick={()=> bookdetails(movie)} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                   // <h3>{movie.description}</h3>
                })}
            </section>
        </main>

    );
}

export default MovieList;