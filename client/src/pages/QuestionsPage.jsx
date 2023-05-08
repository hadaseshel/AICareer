import React, { useState, useEffect, useContext} from "react";
import ResultsPage from "./ResultsPage";
import Question from './Question';
import axios from "axios";
import {UserContext} from "../UserContext";
import {Navigate} from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

export default function QuestionsPage() {
    const {ready, user} = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [redirect, setRedirect] = useState(false);



    useEffect(() => {
        async function fetchQuestions() {
            try {
                const {data} = await axios.get('/api/questions', {});
                setQuestions(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchQuestions();
    }, []);

    const handleNext = (answer) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: answer }));
        setCurrentQuestionIndex((prevIndex) => prevIndex === questions.length - 1 ? prevIndex : prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex === 0 ? prevIndex : prevIndex - 1);
    };

    async function handleSubmit(answer)  {
        const user_answers = [];
        for (const key of Object.keys(answers)) {
            if (answers[key] === "") {
                alert("You didn't answer all questions");
                return;
            }
            user_answers.push(parseInt(answers[key]));
        }
        // Insert the last answer
        user_answers.push(parseInt(answer));
        console.log(user_answers.length)
        try {
            await axios.post('/api/response', {user_id: user._id, user_answers: user_answers});
            setRedirect(true);
        } catch (e) {
            alert('Response failed');
            console.log(e)
        }
    };


    if (questions.length === 0) {
        return 'Loading...';
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={'/results'} />
    }

    const currentQuestionData = questions[currentQuestionIndex];
    const { name, description } = currentQuestionData;

    const questionComponentProps = {
        onNext: handleNext,
        onPrevious: handlePrevious,
        onSubmit: handleSubmit,
        description,
        options: ["1", "2", "3", "4", "5"],
        completePercentage: ((currentQuestionIndex + 1) / questions.length) * 100,
    };

    return (
        <div className="text-center mt-10">
            <ProgressBar style={{width: 850, height: 20}}>
                <ProgressBar striped variant="success" now={((currentQuestionIndex + 1) / questions.length) * 100 }/> 
            </ProgressBar>

            <div className="block-center mt-10">
                <Question {...questionComponentProps} />
            </div>
        </div>
    );
}



