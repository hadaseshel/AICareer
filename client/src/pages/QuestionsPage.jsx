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
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);


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

    const handleSubmit = (answer) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: answer }));
        // go to results...
        
    };

    async function getNumberOfQuestions() {
        try {
            const {data} = await axios.get('/api/questionnaire', {});
            setNumberOfQuestions(data)
        } catch (e) {
            console.log(e)
        }
    }

    if (questions.length === 0) {
        return 'Loading...';
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    const currentQuestionData = questions[currentQuestionIndex];
    const { name, description } = currentQuestionData;

    const questionComponentProps = {
        onNext: handleNext,
        onPrevious: handlePrevious,
        onSubmit: handleSubmit,
        description,
        options: ["1", "2", "3", "4", "5"],
        isLastQuestion: false,
    };

    if (numberOfQuestions == 0){
        getNumberOfQuestions()
    }

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



