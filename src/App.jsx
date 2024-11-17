import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import Layout from './Components/Layout';
import Login from './Pages/Login';
import Register from './Pages/Register';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
