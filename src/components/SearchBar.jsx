import React, { useState } from 'react';
import "../public/static/css/styles.css"
var data = require("./mock_data.json")

function SearchBar() {

  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    //Api Fetch
    console.log('search', searchTerm)
  }

  return (
    <div className="modal-wrapper">
    <div className="modal-overlay"></div>
		<div className="search-div" id='modal'>

      <button className='modal-closebtn'><i className="fa-solid fa-xmark"></i></button>
			<h1 className="search-label">Search for A Game!</h1>
	
			<div className="search-container">
        <div className="search-inner">
          <input type="text" className="search-input" value={value} onChange = {onChange}/>
          <button className="search-btn" onClick={()=>onSearch(value)}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>

        <div className="dropdown">
          {data.filter(item => {
            const searchTerm = value.toLowerCase();
            const gameName = item.name.toLowerCase();

            return searchTerm && gameName.startsWith(searchTerm) && gameName !== searchTerm
          }).slice(0, 5)
          .map((item) => ( 
          <div 
            onClick={()=>onSearch(item.name)} 
            className="dropdown-item"
            key={item.id}
            >
            {item.name}
          </div>
          ))}
        </div>

			</div>
			
		</div>
	</div>
  );
}

export default SearchBar;