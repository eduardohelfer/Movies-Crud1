
const express = require('express')

const port = 9400
const app = express()

app.use(express.json())

const moviesDB = []

/* 
API Peliculas
*/
//! {
//!    id: 1,
//!    title: "Pacific Rim",
//!    year: 2012,
//!    director: "Guillermo del Toro",
//!    genre: ['action', 'Sci-fi'] //opcional
//! }

//! get /movies -> obtener todas las peliculas
//! post /movies -> crear una pelicula nueva
//! get /movies/1 -> obtener la pelicula con el id 1 (por parametros dinamicos)

//! En express


let id = 1

app.get('/', (req, res) => {
  res.json({
    message: 'OK'
  })
})

app.get('/movies', (req, res) => {
  res.status(200).json(moviesDB)
})


app.post('/movies', (req, res) => {
  const { title, year, director, genre } = req.body

  if (title && year && director) {
    const newMovie = {
      id: id++,
      title,
      year,
      director,
      genre
    }
    moviesDB.push(newMovie)
    res.status(200).json(newMovie)
  } else {
    res.status(400).json({ message: 'Not enough Data: Title, Year and Director are mandatory' })
  }
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  const movie = moviesDB.find(item => item.id == id)

  if (movie) {
    res.status(200).json(movie)
  } else {
    res.status(404).json({ message: 'Invalid: ID Not Found' })
  }
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
