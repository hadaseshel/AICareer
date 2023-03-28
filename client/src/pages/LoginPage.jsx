import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/api/login', {email,password});
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
            console.log(e)
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <label htmlFor="email">email</label>
                <input type="email"
                    placeholder="your@email.com"
                    value={email} 
                    onChange={(ev) => setEmail(ev.target.value)} />
                <label htmlFor="password">password</label>
                <input type="password"
                    placeholder="********"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}/>
                <button type="submit">Log In</button>
            </form>
            <div className="text-center py-2 text-gray-500">
                Don't have an account yet? <Link className="link" to={'/register'}>Register Here.</Link>
            </div>
        </div> 
    );
}