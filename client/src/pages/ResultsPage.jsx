import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";

export default function ResultsPage() {
    const {ready, user} = useContext(UserContext);
    //const [answers, set_answers] = useState({})

    async function getRecommendation(user_answers) {
        try {
            console.log("IN GET REC");
            //console.log(user_answers);
            const {data} = await axios.get('/api/recommend', {params: {user_id: user._id, user_answers: user_answers}});
            console.log(data);
        }  catch (e) {
            console.log(e);
        }
    }

    async function getAnswers() {
        try {
            console.log("IN GET ANSWERS");
            console.log( user._id);
            const response = await axios.get('/api/response', { params: { user_id: user._id } });
            const user_answers = response.data.user_answers;
            //console.log(user_answers);
            getRecommendation(user_answers)
        } catch (e) {
            console.log(e);
        }
    }

    if (!ready || !user) {
        return 'Loading...';
    }
    //getAnswers()

    

    getAnswers();
    
    return (
        <div className="text-center max-w-lg mx-auto mt-10">
            RESULTS
        </div>
    );
}