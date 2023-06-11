import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isValidReg, setIsValidReg] = useState(true)
    const [isRegistered, setIsRegistered] = useState(false)



    async function registerUser(ev) {
         ev.preventDefault();
         if (name === "" || email === "" || password === "") {
            setIsValidReg(false);
            setIsRegistered(false);
            return;
        }
         try {
           await axios.post('/api/user/register', {
             name,
             email,
             password,
             type:'normal',
             answered: 0
           });
           setIsValidReg(true);
           setIsRegistered(true);
         } catch (e) {
            setIsValidReg(false);
            setIsRegistered(false);
         }
    }

    return (
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Register
                </h1>
                <form className="max-w-md mx-auto mt-10" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Register</button>
                    {!isValidReg && (
                        <div className="text-center py-2 text-red-500">
                            Registration Failed
                        </div>
                    )}
                    {!!isRegistered && (
                        <div className="text-center py-2 text-green-500">
                            Registration successful. Now you can log in
                        </div>
                    )}
                    <div className="text-center py-2 text-gray-500">
                        Already have an account? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}