import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [character, setCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [quote, setQuote] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNewCharacter = async () => {
    if (searchTerm.trim() !== '') {
      buscarPersonaje(searchTerm);
    } else {
      fetchRandomCharacter();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    handleNewCharacter();
  };

  const buscarPersonaje = async (characterName) => {
    try {
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(characterName)}`);
      const data = await response.json();
      crearCard(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const fetchRandomCharacter = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const data = await response.json();
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        crearCard([randomQuote]);
      } else {
        alert('No quotes found.');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const crearCard = (data) => {
    if (data.length > 0) {
      const randomQuote = data[0];
      setCharacter(randomQuote.character);
      setQuote(randomQuote.quote);
      setImageUrl(randomQuote.image);
    } else {
      setCharacter(null);
      setQuote('');
      setImageUrl('');
      alert('No quotes found.');
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="Search character..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="submit" className="new-character-button">
            New Character
          </button>
        </form>
      </div>
      {quote && character && (
        <div className="quote-container">
          <p className="character">Character: {character}</p>
          {imageUrl && (
            <div className="character-image-container">
              <img src={imageUrl} alt={character} className="character-image" />
            </div>
          )}
          <p className="quote">Quote: {quote}</p>
        </div>
      )}
    </div>
  );
}

export default App;