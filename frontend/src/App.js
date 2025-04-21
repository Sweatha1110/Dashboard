
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';

axios.defaults.baseURL = 'http://localhost:4567';
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App()
{
  const [username,set_username]=useState("");
  const [password,set_password]=useState("");
  const [page,set_page]=useState('login');
  const [message,set_message]=useState("");

  
const handleAuth = async (route) => {
  try {
    const response = await axios.post(`/${route}`, { username, password });
    // console.log(response+"helo");
    const token=response.headers['authorization']
    if (token) sessionStorage.setItem('jwt',`Bearer ${token}`)

    set_message(response.data.message);
    if (route === 'login') set_page('landing');
    set_password('');

  } catch (err) {
    console.error('Auth error:', err);
    set_message(err.response?.data?.error || "Authentication failed");
  }
};

  if (page==='login')
  {
    return <Login username={username} password={password} set_username={set_username} set_password={set_password} set_page={set_page} handleAuth={handleAuth} message={message} ></Login>;
  }
  if (page==='signup')
    {
      return <Signup username={username} password={password} set_username={set_username} set_password={set_password} set_page={set_page} handleAuth={handleAuth} message={message} ></Signup>;
    }
    if (page==='landing')
      {
        return <LandingPage username={username}  onLogout={()=>{sessionStorage.removeItem('jwt');set_page('login');}} ></LandingPage>;
      }
      return null
}
export default App;
