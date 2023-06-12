import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/api/user/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return (<div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Loading...
                        </h1>
                    </div>
                </div>);
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
            className="bi bi-person-circle" viewBox="0 0 16 16"
            style={{ display: 'block', margin: '0 auto', width: 150, height: 150}}>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <div className="text-center max-w-lg mx-auto mt-10">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        </div>
    );
}