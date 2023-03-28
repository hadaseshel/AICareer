import React, { useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function registerUser(ev) {
         ev.preventDefault();
         try {
           await axios.post('/api/register', {
             name,
             email,
             password,
           });
           alert('Registration successful. Now you can log in');
         } catch (e) {
           alert('Registration failed. Maybe the email is already in use');
         }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={registerUser}>
                <label htmlFor="name">Full name</label>
                <input type="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)} />
                <label htmlFor="email">email</label>
                <input type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)} />
                <label htmlFor="password">password</label>
                <input type="password"
                    placeholder="********"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)} />
                <button type="submit">Register</button>
            </form>
            <div className="text-center py-2 text-gray-500">
                Already have an account? <Link className="link" to={'/login'}>Login Here.</Link>
            </div>
        </div> 
    )
}