import React from "react";

const Signup=({username,password,set_username,set_password,set_page,handleAuth,message,})=>
    (
        <div className="app-container">
            <div>
                <h1>Sign UP</h1>
                <form onSubmit={(e)=>{e.preventDefault();handleAuth('signup');}}>
                    <input className="form-gcontrol my-2" type="text" placeholder="Username" value={username}  onChange={(e)=> set_username(e.target.value)}>
                    </input>
                    <input className="form-gcontrol my-2"   autoComplete="new-password" type="password" placeholder="Password" value={password} onChange={(e)=>set_password(e.target.value)}>
                    </input>
                    <button className="btn btn-primary mt-3 " type="submit">Sign up</button>
                </form>
                <p>{message}</p>
                <button className="btn btn-primary mt-3" onClick={()=>set_page('login')} >Go to Login</button>
            </div>
        </div>
    );
export default Signup;