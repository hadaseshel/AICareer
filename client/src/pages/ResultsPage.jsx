import {useContext, useState, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";

export default function ResultsPage() {
    const {ready, user} = useContext(UserContext);
    const [results, setResults] = useState([])


    async function getRecommendation(user_answers) {

        // try to get the recommendation from DB if exist.
        try {
            const {data} = await axios.get("/api/recommend/result", {
                params: { user_id: user._id },
            });
            if (data) {
                console.log(data);
                const user_results = data.results;
                setResults(user_results);
            }
            else {
                console.log("IN GET REC");
                const {data} = await axios.get('/api/recommend', {params: {user_id: user._id, user_answers: user_answers}});
                console.log(data)
                await axios.post('/api/recommend/result', {user_id: user._id, results: data.recommendations});
                setResults(data.recommendations);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (ready && user) {
            async function getAnswers() {
                
                try {
                    console.log("IN GET ANSWERS");
                    console.log(user._id);
                    const response = await axios.get("/api/response", {
                        params: { user_id: user._id },
                    });
                    const user_answers = response.data.user_answers;
                    getRecommendation(user_answers);
                } catch (e) {
                    console.log(e);
                }
            }
            getAnswers();
        }   
    }, [ready, user]);

    if (!ready || !user) {
        return 'Loading...';
    }

    if (results.length < 1) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center mt-40">
                <div className="row mb-10">
                    <div className="spinner-border text-success" style={{width: 150, height: 150}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="row mt-10">
                    <h1 style={{ fontSize: "2rem" }}>We process your answers...</h1>
                </div>
            </div>
       );
    }

    
    return (
        <div className="text-center max-w-lg mx-auto mt-10">
            RESULTS
        </div>
    );
}