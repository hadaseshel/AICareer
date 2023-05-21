import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate} from "react-router-dom";
import EditHome from "./admin edit/EditHome.jsx"
import EditQuestions from "./admin edit/EditQuestions.jsx"


export default function AdminPage() {
    const [redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    if (!ready) {
        return(
            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Loading...
                    </h1>
                </div>
            </div>
        );
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
        <div>
            <div className="mx-auto max-w-2xl py-5 sm:py-21 lg:py-27 text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button
                        type="button"
                        className={`btn ${selectedButton === 0 ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleButtonClick(0)}
                    >
                        Edit Home
                    </button>
                    <button
                        type="button"
                        className={`btn ${selectedButton === 1 ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleButtonClick(1)}
                    >
                        Edit questionnaire
                    </button>
                    <button
                        type="button"
                        className={`btn ${selectedButton === 2 ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => handleButtonClick(2)}
                    >
                        Edit DataBase
                    </button>
                </div>
            </div>
            {selectedButton === 0 && <EditHome />}
            {selectedButton === 1 && <EditQuestions />}
        </div>
    );

}