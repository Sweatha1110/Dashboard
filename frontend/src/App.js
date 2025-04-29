
import React, { useEffect, useState } from 'react';
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
  const [page,set_page]=useState(()=>sessionStorage.getItem('page' )|| 'login');
  const [message,set_message]=useState("");
  useEffect(() =>
  {
    const token=sessionStorage.getItem('jwt');
    if(token)
    {
      set_page('landing');
    }
  },[]
);
  
const handleAuth = async (route) => {
  try {
    const response = await axios.post(`/api/${route}`, { username, password });
    // console.log(response+"hello");
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
 return(
  <div className='app-container'>
  {page==='login' && (
  
    <Login username={username} password={password} set_username={set_username} set_password={set_password} set_page={set_page} handleAuth={handleAuth} message={message} ></Login>
  
  )}

  {page==='signup' && (
    
    <Signup username={username} password={password} set_username={set_username} set_password={set_password} set_page={set_page} handleAuth={handleAuth} message={message} ></Signup>
  
  )}
  { page==='landing' && (
      
    <LandingPage username={username}  onLogout={()=>{sessionStorage.removeItem('jwt');set_page('login');}} ></LandingPage>
  
  )}
      
  </div>
);
}
export default App;
