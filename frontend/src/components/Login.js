import React from "react";

const Login=({username,password,set_username,set_password,set_page,handleAuth,message,})=>
    (
        <div className="app-container">
            <div>
                <h1>Login</h1>
                <form onSubmit={(e)=>{e.preventDefault();handleAuth('login');}}>
                    <input className="form-control my-2" type="text" placeholder="Username"   autoComplete="username" value={username} onChange={(e)=> set_username(e.target.value)}
                    />
                    <input className="form-control my-2" type="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e)=>set_password(e.target.value)}/>
                    <button className="btn btn-primary mt-3 " type="submit">Login</button>
                </form>
                <p>{message}</p>
                <button className="btn btn-primary mt-3" onClick={()=>set_page('signup')} >Go to Sign up</button>
            </div>
        </div>
    );
export default Login;