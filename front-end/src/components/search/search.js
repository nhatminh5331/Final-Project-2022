import React, {useState} from 'react';
import './Search.css';

const SearchBar = () => {

    const [gameInput, setGameInput] = useState("")

    const searchGame = (event) => {
      event.preventDefault();
    }

    return(
      <div className='searchBar-wrap'>
        <form onSubmit={searchGame}>
          <input
            type='text'
            placeholder='Search by Game...'
            value={gameInput}
            onChange={event => setGameInput(event.target.value)}/>
            <button type='submit'>
              <box-icon name='search' color='white' size='20px'></box-icon>
            </button>
        </form>
      </div>
)};

export default SearchBar;