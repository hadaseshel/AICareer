import {Link} from "react-router-dom";

export default function NotFoundPage() {

    return(
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                   Oops! <br></br> This page is not available
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-800">
                   <Link className="custom-link" to={'/'}>Back Home</Link>
                </p>
            </div>
        </div>
      );
}