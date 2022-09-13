import { Routes, Route } from 'react-router-dom';
import Header from './Global/header';
import Home from './Pages/Home/home';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  );
};

export default App;
