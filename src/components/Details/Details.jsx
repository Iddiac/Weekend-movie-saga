import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './Details.css'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { teal } from '@mui/material/colors';
import { ViewDayTwoTone } from '@mui/icons-material'

function Details() {
    const history = useHistory();
    const movies = useSelector(store => store.movies)
    const currentGenre = useSelector(store => store.currentGenre)
    const params = useParams();

    
    console.log('this is current genre', currentGenre)
    const movieId = params.movieId


    let movie = movies.find(movie => movie.id === Number(movieId));
    console.log('on movie', movie)
    
    
    const viewUp = () => {
        if (movie.id < movies.length) { history.push(`/Details/${movie.id + 1}`) }
        else if (movie.id === movies.length){history.push('/Details/1')}
    };


    const viewDown = () => {
        if (movie.id > 1) { history.push(`/Details/${movie.id - 1}`) }
        else if (movie.id === 1) {history.push(`/Details/${movies.length}`)}
    };

    if (movie === undefined) {
        return <h2>Invalid book</h2> }


        return (
            // make a button so that when you press it, it goes to the next movie.
            <div className='detail'>
                <header>
                    <h2>Navation</h2>
                    <ArrowBackIcon onClick={() => { viewDown() }} sx={{ fontSize: 50, color: teal[300] }} />
                    <ArrowForwardIcon onClick={() => { viewUp() }} sx={{ fontSize: 50, color: teal[300] }} />
                    <br />
                    <Button onClick={() => history.push('/')} variant='text'>Home</Button>
                </header>

                <>

                    <h3>{movie.title}</h3>
                    {currentGenre.map((genre,i)=>(
                                <h3>{genre.name}</h3>)
                    )}
                    <img src={movie.poster} />
                    <h3>{movie.description}</h3>
                </>


            </div>

        )
    
}
export default Details;