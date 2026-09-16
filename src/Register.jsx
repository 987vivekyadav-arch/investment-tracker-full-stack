import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register(){

const navigate=useNavigate()


const[register,setRegister]=React.useState([])

const[name,setName]=React.useState("")
const[email,setEmail]=React.useState("")
const[password,setPassword]=React.useState("")


    return(
<div className="register-page">


    <div className="register-card">


        <div className="register-logo">
            <span>▮▮</span> InvestMate
        </div>


        <div className="register-subtitle">
            Invest Together. Grow Smarter.
        </div>


        <div className="register-heading">
            Create Account
        </div>


        <div className="register-description">
            Create your account to start tracking your investments.
        </div>


        <div className="register-form">


            <div className="register-field">

                <label>
                    Name
                </label>

                <input
                    className="register-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={function(event){
                        setName(event.target.value)
                    }}
                />

            </div>


            <div className="register-field">

                <label>
                    Email
                </label>

                <input
                    className="register-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={function(event){
                        setEmail(event.target.value)
                    }}
                />

            </div>


            <div className="register-field">

                <label>
                    Password
                </label>

                <input
                    className="register-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={function(event){
                        setPassword(event.target.value)
                    }}
                />

            </div>


            <button
                className="register-button"
                onClick={function(){

                    fetch("http://localhost:5000/register",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            name:name,
                            email:email,
                            password:password
                        })
                    })
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){

                        console.log(data)

                        setRegister(data)

                        navigate("/login")

                    })

                }}
            >
                Register
            </button>


        </div>


        <div className="register-login">

            Already have an account?

            <Link
                className="register-login-link"
                to="/login"
            >
                Login
            </Link>

        </div>


    </div>


</div>
    )
}

export default Register;