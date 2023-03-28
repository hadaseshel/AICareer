import {Link} from "react-router-dom";

export default function HomePage() {
    return(
        <div>
            <label htmlFor="home">Home</label>
            <Link to={'/login'}>Log In</Link>
        </div>
    );
}