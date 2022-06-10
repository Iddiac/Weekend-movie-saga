import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
function Details() {
    let detail = '';
    const movies = useSelector(store => store.movies)

    const params = useParams();
    console.log(params);


    const movieId = params.movieId
    let movie = movies.find(movie => movie.id === Number(movieId));
    console.log('on movie', movie)

    return (
        <div className='detail'>
            <h2>details go here:</h2>
            
                <>
                    <h3>{movie.title}</h3>
                    <img src={movie.poster} />
                    <h3>{movie.description}</h3>
                </>
           
        </div>

    )
}
export default Details;