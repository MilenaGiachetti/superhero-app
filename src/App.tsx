import React from 'react';
import './App.css';
import Home from './views/Home';

const App:React.FC = () => {
  return (
    <>
      <header>
        <h1>Superhero App</h1>
      </header>
      <main>
        <Home/>
      </main>
      <footer></footer>
    </>
  );
}

export default App;