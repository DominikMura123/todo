import React, { useState } from 'react';

import './index.css';

function App() {
  const [text, changeText] = useState('World');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) =>{
    e.preventDefault();
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    changeText(inputValue);
    setInputValue('');
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Wpisz treść
          <input 
            type="text" 
            value={inputValue}
            onChange={handleInputChange}
            />
        </label>
        <button type="submit">Send</button>
      </form>
      <h1> Hello {text} </h1>
    </div>
  );
}

export default App;
