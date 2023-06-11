import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    const [isValidReg, setIsValidReg] = useState(true)

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/api/user/login', {email,password});
            setUser(data);
            setRedirect(true);
        } catch (e) {
            setIsValidReg(false);
            console.log(e)
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Login
                    </h1>
                    <form className="max-w-md mx-auto mt-10" onSubmit={handleLoginSubmit}>
                        <input type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)} />
                        <input type="password"
                                placeholder="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)} />
                        <button className="primary">Login</button>
                        {!isValidReg && (
                            <div className="text-center py-2 text-red-500">
                                Login Failed
                            </div>
                        )}
                        <div className="text-center py-2 text-gray-500">
                            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                        </div>
                    </form>
            </div>
        </div>
    );
}