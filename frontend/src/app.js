import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Global/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';

const App = () => {
  const [page, setPage] = useState(0);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home page={page} setPage={setPage}/>}/>
        <Route path='/project/:id' element={<Project />} />
      </Routes>
    </>
  );
};

export default App;
