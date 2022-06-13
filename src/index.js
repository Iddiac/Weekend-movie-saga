import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('GET_GENRE', fetchCurrentGenres);
   // yield takeEvery('FETCH_DETAILS', fetchCurrentMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}
// My attempt at making a saga

/* function* fetchCurrentMovie() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_DETAILS', payload: movies.data.id });

    } catch {
        console.log('get details error');
    }

}
*/

function* fetchAllGenres() {
    // get all movies from the DB
    try {
        const genres = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: genres.data });

    } catch {
        console.log('get genre error');
    }

}

function* fetchCurrentGenres(action) {
    // get all movies from the DB
    try {
        const genres = yield axios.post('/api/genre', action.payload);
        yield put({ type: 'SET_GENRE', payload: genres.data });

    } catch {
        console.log('get current genre error');
    }

}

function* fetchMoviesAndGenres() {
    try {
        const fullDetails = yield axios.post('api/movies', action.payload)

    } catch { }
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const currentGenre = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE':
            console.log('this is action in current genre', action.payload)
            return action.payload;
        default:
            return state;
    }
}

const movieDetails = (state = {}, action) => {
    if (action.type === 'SET_DETAILS') {
        console.log(action.payload);
        return action.payload
    }
    return state;

}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        currentGenre
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
