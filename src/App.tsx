import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Hero from './views/Hero';

const App = () => {
  return (
    <>
      <header>
        <h1>Superhero App</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/hero/:id" element={<Hero />}/>
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;