import { useState } from 'react';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom'
import CreateInterviewPost from './components/create/CreateInterviewPost';
import DetailedPost from './components/detailedPost/DetailedPost';
import YourPosts from './components/home/posts/YourPosts';
import Updatepost from './components/create/Updatepost';
const PrivateRoute=({isAuthenticated, ...props})=>{
  return isAuthenticated ?
  <>
  <Header/>
  <Outlet/>
  </>
  : <Navigate replace to='/login'/>

}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop:64}}>
        <Routes>
          <Route path='login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/' element={<Home/>} />
          </Route>
          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/create' element={<CreateInterviewPost/>} />
          </Route>
          <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/details/:id' element={<DetailedPost/>} />
          </Route>
          <Route path='/personal/posts' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/personal/posts' element={<YourPosts/>} />            
          </Route>
          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/update/:id' element={<Updatepost/>} />            
          </Route>
        </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;
