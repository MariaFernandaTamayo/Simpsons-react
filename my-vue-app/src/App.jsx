import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [character, setCharacter] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
      .then(response => response.json())
      .then(data => {
        setFilteredQuotes(data);
        if (data && data[0]) {
          setQuote(data[0].quote);
          setCharacter(data[0].character);
          setImageUrl(getImageUrl(data[0].character));
        }
      })
      .catch(error => console.error('Error fetching quote:', error));
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchCharacter = () => {
    if (searchTerm) {
      const filtered = filteredQuotes.filter(
        q => q.character.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        setCharacter(filtered[0].character);
        setQuote(filtered[0].quote);
        setImageUrl(getImageUrl(filtered[0].character));
      } else {
        setCharacter('');
        setQuote(`Character "${searchTerm}" not found`);
        setImageUrl('');
      }
    } else {
      setCharacter('');
      setQuote('Please enter a character name');
      setImageUrl('');
    }
  };

  const handleNewCharacter = () => {
    fetchQuote();
  };

  const getImageUrl = character => {
    switch (character) {
      case 'Homer Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png';
      case 'Marge Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png';
      case 'Bart Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png';
      case 'Lisa Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png';
      case 'Maggie Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/9/9d/Maggie_Simpson.png';
      case 'Grandpa Simpson':
        return 'https://upload.wikimedia.org/wikipedia/en/0/0a/Abraham_Simpson.png';
      case 'Ned Flanders':
        return 'https://upload.wikimedia.org/wikipedia/en/7/7d/Ned_Flanders.png';
      case 'Mr. Burns':
        return 'https://i.pinimg.com/236x/26/80/d7/2680d77215ca0cd66a7e2783e80c1e91.jpg';
      case 'Milhouse Van Houten':
        return 'https://upload.wikimedia.org/wikipedia/en/1/11/Milhouse_Van_Houten.png';
      case 'Moe Szyslak':
        return 'https://i.pinimg.com/236x/c3/39/c8/c339c8d8bc2642d73f5a468c2f007c4c.jpg';
      case 'Troy McClure':
        return 'https://upload.wikimedia.org/wikipedia/en/6/6c/Troymcclure.png';
      case 'Otto':
        return 'https://upload.wikimedia.org/wikipedia/ru/e/e3/Otto_Simpson.png'; 
      case 'Chief Wiggum' :
        return 'https://i.pinimg.com/236x/77/8a/b9/778ab98703e9340ce69c394496976f1d.jpg';
      case 'Dr. Nick':
        return 'https://i.pinimg.com/236x/98/b7/2c/98b72c65039f3d92fccb842bac5522d1.jpg';
      case 'Mayor Quimby':
        return 'https://i.pinimg.com/236x/ff/76/c5/ff76c56739392f0bedd0ea5cef3cb1f3.jpg'; 
      case 'Duffman' :
        return 'https://i.pinimg.com/236x/10/49/91/104991ef30424ee7ffb74d7ed93f384b.jpg';
      case 'Apu Nahasapeemapetilon':
        return 'https://i.pinimg.com/236x/54/5c/6d/545c6ddf525d9f76cb484d5cc73a88b5.jpg';
      case 'Ralph Wiggum':
        return 'https://i.pinimg.com/236x/ed/6f/92/ed6f92a1b42ab5dc587b4995bb5d7728.jpg';
      case 'Comic Book Guy' :
        return 'https://i.pinimg.com/236x/ec/d4/5a/ecd45aa5a2447fad447d3fe8d46f3f92.jpg';
      case 'Waylon Smithers':
        return 'https://i.pinimg.com/236x/c1/59/46/c159464fc7a78e454f7f88e653cc658c.jpg';
      case 'Nelson Muntz':
        return 'https://i.pinimg.com/236x/bc/16/f9/bc16f9cb28b81f0d0a9e60bace7601cd.jpg';
      case 'Abe Simpson':
        return 'https://i.pinimg.com/236x/21/ba/8c/21ba8c7b68dcaed1d5402d6bffc9d443.jpg';
      case 'Frank Grimes':
        return 'https://i.pinimg.com/236x/7b/3d/36/7b3d36bdbfddbb25e616f226b8b4ce02.jpg';
      case 'Groundskeeper Willie':
        return 'https://i.pinimg.com/236x/10/bd/19/10bd190e68bdbeb0106076436784b059.jpg';
      case 'Principal Skinner':
        return 'https://i.pinimg.com/236x/70/5a/f4/705af4cb38f814c24d468e0674d893f3.jpg';
      case 'Rainier Wolfcastle':
        return 'https://i.pinimg.com/236x/f4/7d/48/f47d4885290396a5ba5d9d117eec504a.jpg';
        default:
        return '';
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <input
          type="text"
          placeholder="Search character..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button" onClick={handleSearchCharacter}>
          Search Character
        </button>
        <button className="new-character-button" onClick={handleNewCharacter}>
          New Character
        </button>
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