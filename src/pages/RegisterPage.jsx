import React, { useState } from "react"
import {Link, Navigate} from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input type="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">email</label>
                <input type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">password</label>
                <input type="password"
                    placeholder="********"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
            <div className="text-center py-2 text-gray-500">
                Already have an account? <Link className="link" to={'/login'}>Login Here.</Link>
            </div>
        </div> 
    )
}