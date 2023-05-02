import React, { useState, useEffect } from "react";
import ResultsPage from "./ResultsPage";
import Question from './Question';
import axios from "axios";

export default function QuestionsPage() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});


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

    if (questions.length === 0) {
        return 'Loading...';
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

    return (
        <Question {...questionComponentProps} />
    );
}



