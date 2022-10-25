import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Global/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import Profile from './Pages/User/Profile';
import TopUp from './Pages/TopUp/TopUp';
import TWDSwapStakeA from './Pages/Swap/StakeA';
import RedeempoolA from './Pages/Swap/RedeemPoolA';

const App = () => {
  const [page, setPage] = useState(0);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home page={page} setPage={setPage}/>} />
        <Route path='/project/:id' element={<Project />} />
        <Route path='/user' element={<Profile/>} />
        <Route path='/topup' element={<TopUp />} />
        <Route path='/project/:id/swap' element={<TWDSwapStakeA />} />
        <Route path='/project/:id/redeem' element={<RedeempoolA />} />
      </Routes>
    </>
  );
};

export default App;
