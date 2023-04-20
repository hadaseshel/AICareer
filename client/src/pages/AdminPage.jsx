import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate} from "react-router-dom";

export default function AdminPage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    else if (ready && !(user.type === 'admin') && !redirect) {
        return (
        <div className="text-center max-w-lg mx-auto mt-10">
        Oops! This page is not available.<br />
        <Link className="underline text-black" to={'/'}>Back Home</Link>
        </div> );
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="text-center max-w-lg mx-auto mt-10">
            Admin Area<br />
            <button className="primary max-w-sm mt-2">Edit questionnaire</button><br />
            <button className="primary max-w-sm mt-2">Block User</button><br />
            <button className="primary max-w-sm mt-2">Edit DataBase</button>
        </div>
    );

}