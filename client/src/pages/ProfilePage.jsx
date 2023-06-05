import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
//import PlacesPage from "./PlacesPage";
//import AccountNav from "../AccountNav";

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
        <div className="text-center max-w-lg mx-auto mt-10">
            Logged in as {user.name} ({user.email})<br />
            <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
    );
}