import React, { useEffect, useState } from "react";
import "../SignUp/SignUp.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { handleLogIn } from "../../util/users";

type LoginProps = {

}

const Login = (props: LoginProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const nav = useNavigate();

    useEffect(()=>{
        return () => resetFields();
    },[]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            resetFields();
            const login = await handleLogIn(email, password, setErrorMessage);
            if (login) nav("/");
        } catch (e) {
            console.error(e);
            setErrorMessage("Something went wrong. Try again later");
        }
    }

    const resetFields = () => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
    }


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="page LoginSignup--page">
            <form className="LoginSignup--form" onSubmit = { handleSubmit }>
                <label>Log in</label>
                {
                    (errorMessage.length > 0)
                    ? <p className="error-message">{ errorMessage }</p>
                    : null
                }
                 <input 
                    placeholder="E-mail"
                    type="text"
                    value = { email }
                    onChange = { handleEmailChange }
                    required
                />
                <input 
                    placeholder="Password"
                    type="password"
                    value = { password }
                    onChange = { handlePasswordChange }
                    required
                />

                <button type="submit">Sign up</button>
                <Link to="/sign-up">Don't have an account? Sign up here!</Link>
            </form>
        </div>
    )
}

export default Login;