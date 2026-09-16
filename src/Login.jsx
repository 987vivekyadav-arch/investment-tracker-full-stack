import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login(){

const navigate=useNavigate()


const[login,setLogin]=React.useState(null)


const[email,setEmail]=React.useState("")
const[password,setPassword]=React.useState("")


    return(
<div className="login-page">


    <div className="login-card">


        <div className="login-logo">
            <span>▮▮</span> InvestMate
        </div>


        <div className="login-subtitle">
            Invest Together. Grow Smarter.
        </div>


        <div className="login-heading">
            Welcome Back
        </div>


        <div className="login-description">
            Login to continue tracking your investments.
        </div>


        <div className="login-form">


            <div className="login-field">

                <label>
                    Email
                </label>

                <input
                    className="login-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={function(event){
                        setEmail(event.target.value)
                    }}
                />

            </div>


            <div className="login-field">

                <label>
                    Password
                </label>

                <input
                    className="login-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={function(event){
                        setPassword(event.target.value)
                    }}
                />

            </div>


            <button
                className="login-button"
                onClick={function(){

                    fetch("https://investment-tracker-full-stack.onrender.com/login",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email:email,
                            password:password
                        })
                    })
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){

                        console.log(data)

                        localStorage.setItem("token",data.token)

                        setLogin(data)

                        navigate("/home")

                    })

                }}
            >
                Login
            </button>


        </div>


        <div className="login-register">

            Don't have an account?

            <Link
                className="login-register-link"
                to="/"
            >
                Register
            </Link>

        </div>


    </div>


</div>
    )
}

export default Login;