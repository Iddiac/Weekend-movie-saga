const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `SELECT * FROM genres`;
  pool.query(query)
    .then( result => {
      console.log('this is in genreRouter', query);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Could not get genres', err);
      res.sendStatus(500)
    })

});

router.post('/', (req,res)=>{
  const query=`select genres.name from movies
  JOIN movies_genres ON movies_genres.movie_id= movies.id
  JOIN genres on movies_genres.genre_id = genres.id
  where movies.id = ${req.body.id}`;
  pool.query(query)
    .then( result => {
      console.log('Post genre Router', query);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Could not get genres in post router', err);
      res.sendStatus(500)
    })
});


module.exports = router;