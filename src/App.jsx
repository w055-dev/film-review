import { useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([
    {id: 1, title: 'Интерстеллар', status: 'watched'},
    {id: 2, title: 'Дюна', status: 'want'},
    {id: 3, title: 'Иллюзия обмана 3', status: 'watched'}
  ])
  
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [filter, setFilter] = useState('all')

  const addMovie = (e) => {
    e.preventDefault()
    if (newMovieTitle.trim()) {
      const newMovie = { 
        id: Date.now(),
        title: newMovieTitle.trim(),
        status: 'want'
      }
      setMovies([...movies, newMovie])
      setNewMovieTitle('')
    }
  }

  const changeStatus = (id, newStatus) => {
    setMovies(movies.map(movie =>
      movie.id === id ? {...movie, status: newStatus} : movie
    ))
  }

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id))
  }

  const filteredMovies = movies.filter(movie => {
    if (filter === 'all') return true
    return movie.status === filter
  })

  return (
    <div className='app'>
      <h1>Список фильмов</h1>
      
      <form onSubmit={addMovie} className='add-form'>
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="Название фильма"
        />
        <button type="submit">Добавить</button>
      </form>

      <div className='filters'>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={filter === 'want' ? 'active' : ''}
          onClick={() => setFilter('want')}
        >
          Хочу посмотреть
        </button>
        <button
          className={filter === 'watched' ? 'active' : ''}
          onClick={() => setFilter('watched')}
        >
          Просмотрено
        </button>
      </div>
      
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span className={`status ${movie.status}`}>
                {movie.status === 'watched' ? 'Просмотрено' : 'Хочу посмотреть'}
              </span>
            </div>
            
            <div className="movie-actions">
              <button 
                onClick={() => changeStatus(movie.id, 'want')}
                disabled={movie.status === 'want'}
              >
                Хочу
              </button>
              <button 
                onClick={() => changeStatus(movie.id, 'watched')}
                disabled={movie.status === 'watched'}
              >
                Посмотрел
              </button>
              <button 
                onClick={() => deleteMovie(movie.id)}
                className="delete"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="empty">Фильмов нет</p>
      )}
    </div>
  )
}

export default App