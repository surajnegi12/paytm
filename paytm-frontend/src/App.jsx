import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Signin} from './pages/Signin'
import Signup from './pages/Signup'
import {SendMoney} from './pages/SendMoney'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setLoggedInCredentials } from './feature/userSlice'
import CheckBalance from './pages/CheckBalance'
import TransectionHistory from './pages/TransectionHistory'
import Home from './pages/Home'
import ProtrctedRoutes from './components/ProtrctedRoutes'

function App() {
  const dispatch =useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem("user");
    if (token && storedUser && storedUser !== "undefined") {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setLoggedInCredentials({ userDetails: user, token }));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/'  element={<Home/>}/>
        <Route path='/dashboard'  element={<ProtrctedRoutes><Dashboard/></ProtrctedRoutes>}/>
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/send' element={<ProtrctedRoutes><SendMoney/></ProtrctedRoutes>} />
        <Route path='/checkbalance' element={<ProtrctedRoutes><CheckBalance/></ProtrctedRoutes>}/>
        <Route path='/history' element={<ProtrctedRoutes><TransectionHistory/></ProtrctedRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
