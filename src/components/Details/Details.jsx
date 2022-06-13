import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './Details.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { teal, red, blueGrey} from '@mui/material/colors';
import { CardContent } from '@mui/material'
import CardActions from '@mui/material/CardActions';

function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies)
    const currentGenre = useSelector(store => store.currentGenre)
    const params = useParams();

    const movieId = params.movieId
    let movie = movies.find(movie => movie.id === Number(movieId));

    useEffect(() => {
        if (movie) {
            dispatch({ type: 'GET_GENRE', payload: movie })
        }
    }, [movie])


    console.log('this is current genre', currentGenre)


    console.log('on movie', movie)


    const viewUp = () => {
        if (movie.id < movies.length) { history.push(`/Details/${movie.id + 1}`) }
        else if (movie.id === movies.length) { history.push('/Details/1') }
    };


    const viewDown = () => {
        if (movie.id > 1) { history.push(`/Details/${movie.id - 1}`) }
        else if (movie.id === 1) { history.push(`/Details/${movies.length}`) }
    };

    if (movie === undefined) {
        return <h2>Invalid movie</h2>
    }

    else {


        return (
            <div className='detail'>
                <header>
                    <h2>Navation</h2>
                    <Button onClick={() => history.push('/')} variant='text'>Home</Button>
                </header>
                <div className='card'>
                    <Card style={{backgroundColor: "purple"}}  sx={{ color: teal[300], minWidth: 275, maxWidth: 800, minHeight: 300, maxHeight: 1000 }} variant='outlined'>
                        <CardContent>
                            <CardActions >

                                <ArrowBackIcon onClick={() => { viewDown() }} sx={{ fontSize: 50, color: red[500] }} />
                                <ArrowForwardIcon onClick={() => { viewUp() }} sx={{ fontSize: 50, color: red[500] }} />

                            </CardActions>
                            <Typography sx={{ color:red[500] }} variant="h5" component="div">
                                <h3>{movie.title}</h3>
                            </Typography>
                            <Typography sx={{ mb: 1.5, color:teal[300] }} color="text.secondary">
                                {currentGenre.map((genre, i) => (
                                    <h3 key={i}>{genre.name}</h3>)
                                )}
                            </Typography>
                            <img src={movie.poster} />
                            <Typography sx={{ color:blueGrey[300] }}  variant="body2">
                                <h3>{movie.description}</h3>
                            </Typography>

                        </CardContent>
                    </Card>
                </div>




            </div>




        )
    }

}
export default Details;