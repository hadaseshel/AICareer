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

    const handleChange = (answer) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: answer }));
    };

    const handleNext = (answer) => {
        setCurrentQuestionIndex((prevIndex) => prevIndex === questions.length - 1 ? prevIndex : prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex === 0 ? prevIndex : prevIndex - 1);
    };

    async function handleSubmit()  {
        const user_answers = [];
        if (Object.keys(answers).length !== questions.length) {
            alert("You didn't answer all questions");
            return;
        }
        for (const key of Object.keys(answers)) {
            user_answers.push(parseInt(answers[key]));
        }

        try {
            await axios.post('/api/response', {user_id: user._id, user_answers: user_answers});
            setRedirect(true);
            await axios.put('/api/user/useranswered', {user_id: user._id});
        } catch (e) {
            alert('Response failed');
            console.log(e)
            return;
        }
    };


    if (questions.length === 0) {
        return (
            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Loading...
                </h1>
            </div>
        </div>);
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

    if (redirect || user.answered === 1) {
        return <Navigate to={'/results'} />
    }

    const currentQuestionData = questions[currentQuestionIndex];
    const { name, description } = currentQuestionData;

    const questionComponentProps = {
        onChange: handleChange,
        onNext: handleNext,
        onPrevious: handlePrevious,
        onSubmit: handleSubmit,
        question: currentQuestionData,
        options: ["1", "2", "3", "4", "5"],
        completePercentage: ((currentQuestionIndex + 1) / questions.length) * 100,
        answers,
    };

    return (
        <div className="text-center mt-16">
            <ProgressBar style={{width: 850, height: 20}}>
                <ProgressBar striped variant="success" now={((currentQuestionIndex + 1) / questions.length) * 100 }/> 
            </ProgressBar>

            <div className="block-center mt-10">
                <Question {...questionComponentProps} />
            </div>
        </div>
    );
}



