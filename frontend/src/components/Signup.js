import React from "react";
import "./Signup.css";
import { FaSignInAlt } from 'react-icons/fa';
import { FaUserPlus } from "react-icons/fa";
const Signup=({username,password,set_username,set_password,set_page,handleAuth,message,})=>
    (
        <div className="signup-container">
            <div className="signup">
                <h1>Sign Up</h1>
                <br></br>
                <form onSubmit={(e)=>{e.preventDefault();handleAuth('signup');}}>
                    <input className="input form-control my-2" type="text" placeholder="Username" value={username}  onChange={(e)=> set_username(e.target.value)}>
                    </input>
                  
                    <input className="input form-control my-2"   autoComplete="new-password" type="password" placeholder="Password" value={password} onChange={(e)=>set_password(e.target.value)}>
                    </input>
                    <button className="button btn btn-primary mt-3 " type="submit">Sign up <FaUserPlus/></button>
                </form>
                <p>{message}</p>
                <button className="button btn btn-primary mt-3" onClick={()=>set_page('login')} >Go to Login <FaSignInAlt/></button>
            </div>
        </div>
    );
export default Signup;