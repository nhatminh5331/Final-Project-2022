import React from 'react';
import './Search.css';

const SearchBar = () => (
  <div className='searchBar-wrap'>
    <form >
        
      <input
        type='text'
        placeholder='Search By Category'
      />
      
      <button>Go</button>
    </form>
  </div>
);

export default SearchBar;