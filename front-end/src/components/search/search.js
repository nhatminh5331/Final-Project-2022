import React from 'react';
import './Search.css';

const SearchBar = () => (
  <div className='searchBar-wrap'>
    <form >
        
      <input
        type='text'
        placeholder='Search by Game'
      />
      
      <button><box-icon name='search' color='white' size='20px'></box-icon></button>
    </form>
  </div>
);

export default SearchBar;