import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import DetailMovie from './pages/DetailMovie';
import SearchPages from './pages/SearchPages';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<DetailMovie />} />
        <Route path='/search/:query' element={<SearchPages />} />
        <Route path='/category/:genre/:id' element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
