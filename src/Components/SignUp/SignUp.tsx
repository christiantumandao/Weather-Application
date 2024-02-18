import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { validateSignUp } from "../../util/validation";
import { handleSignUp } from "../../util/users";
import { useNavigate } from "react-router-dom";

type SignUpProps = {

}

const SignUp = (props: SignUpProps) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const nav = useNavigate();

    useEffect(()=>{
        return () => resetFields();
    },[]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const valid = validateSignUp(firstName, lastName, email, password, confirmPassword, setErrorMessage);
            if (!valid) return;

            await handleSignUp(firstName, lastName, email, password, setErrorMessage);
            nav("/");
        } catch (e) {
            console.error(e);
            setErrorMessage("Something went wrong. Try again later");
        }
    }

    const resetFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="page LoginSignup--page">
            <form className="LoginSignup--form" onSubmit = { handleSubmit }>
                <label>Sign up</label>
                {
                    (errorMessage.length > 0) ? <p className="error-message">{ errorMessage }</p> : null
                }
                <input 
                    placeholder="First Name"
                    type="text"
                    value = { firstName }
                    onChange = { handleFirstNameChange }
                    required
                />
                <input 
                    type="text"
                    placeholder="Last Name"
                    value = { lastName }
                    onChange = { handleLastNameChange }
                    required
                />
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
                <input 
                    placeholder="Confirm Password"
                    type="password"
                    value = { confirmPassword }
                    onChange = { handleConfirmPasswordChange }
                    required
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;