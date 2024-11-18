import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import Layout from './Components/Layout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { UserContextProvider } from './Context/UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';


const App = () => {
  return (
    <>
   
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost/>}/>
            <Route path='/post/:id' element={<PostPage />} />


          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
