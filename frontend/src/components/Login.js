import React from "react";
import "./Login.css"
import { FaSignInAlt } from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa";
const Login=({username,password,set_username,set_password,set_page,handleAuth,message,})=>
    (
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>
                <br></br>
                <form onSubmit={(e)=>{e.preventDefault();handleAuth('login');}}>
                    <input className="input form-control my-2" type="text" placeholder="Username"   autoComplete="" value={username} onChange={(e)=> set_username(e.target.value)}
                    />
                    <input className="input form-control my-2" type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e)=>set_password(e.target.value)}/>
                    <button className="button btn btn-primary mt-3 " type="submit">Login <FaSignInAlt/> </button>
                </form>
                <p>{message}</p>
                <button className="button btn btn-primary mt-3" onClick={()=>set_page('signup')} >Go to Sign up <FaUserPlus/></button>
            </div>
        </div>
    );
export default Login;