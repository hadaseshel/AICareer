import {Link} from "react-router-dom";
import ReactCounUp,{CountUp } from 'react-countup'
import { useRef, useEffect } from "react";
import {useContext, useState} from "react";
import axios from "axios";
import ScrollTrigger from 'react-scroll-trigger'

export default function HomePage() {
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfOccupations, setNumberOfOccupations] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [counterOn, setCounterOn]= useState(false);


    async function getNumberOfUsers() {
        try {
            const {data} = await axios.get('/api/users', {});
            setNumberOfUsers(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getNumberOfOccupations() {
        try {
            const {data} = await axios.get('/api/occupations', {});
            setNumberOfOccupations(data)
        } catch (e) {
            console.log(e)
        }
        try {
            const {data} = await axios.get('/api/questionnaire', {});
            setNumberOfQuestions(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getNumberOfQuestions() {
        try {
            const {data} = await axios.get('/api/questionnaire', {});
            setNumberOfQuestions(data)
        } catch (e) {
            console.log(e)
        }
    }

    // get all the data for the section of Let's talk with numbers
    if (numberOfUsers == 0){
        getNumberOfUsers()
    }
    if (numberOfOccupations == 0){
        getNumberOfOccupations()
    }
    if (numberOfQuestions == 0){
        getNumberOfQuestions()
    }

    return(
        <div>
            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    What is AIcareer?
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-gray-800">
                        AIcareer is an artificial intelligence based system that helps you find the right profession for you, according to your tendencies and data.
                    </p>
                    <p className="mt-6 text-xl leading-8 text-gray-800">
                        All you have to do is answer a questionnaire that will allow the system to get to know, then our AI will match you with the perfect profession for you.
                    </p>
                    <div className="mt-10 gap-x-6">
                        <button className="btn btn-success">Get started</button>
                    </div>
                </div>
            </div>

       

            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Let's talk with numbers
                    </h1>
                    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
                        <div class="container text-center mt-8">
                            <div class="row row-cols-3">
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                {counterOn &&<ReactCounUp isCounting end={numberOfQuestions} duration={3.2} />}
                                            </h2>
                                            <h5 class="card-title">Questionnaire</h5>
                                                <p class="card-text">
                                                    The number of questions in the questionnaire
                                                </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                {counterOn && <ReactCounUp isCounting end={numberOfUsers} duration={3.2} />}
                                            </h2>
                                            <h5 class="card-title">Users</h5>
                                            <p class="card-text">
                                                The number of users in the system
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                {counterOn &&<ReactCounUp isCounting end={numberOfOccupations} duration={3.2} />}
                                            </h2>
                                            <h5 class="card-title">Occupations</h5>
                                            <p class="card-text">
                                                The number of occupations in the system
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollTrigger>
                </div>
            </div>


            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Career market status
                    </h1>
                    
                        <div class="container text-center mt-8">
                            <div class="row mb-4">
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                                    <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"/>
                                                </svg>
                                            </h2>
                                            <h5 class="card-title">Unemployed</h5>
                                                <p class="card-text">
                                                    The percentage of unemployed residents in Israel is 3.9
                                                </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
                                            </svg>
                                                
                                            </h2>
                                            <h5 class="card-title">Israeli employees</h5>
                                            <p class="card-text">
                                                The number of employed Israelis is 4.316 in millions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                                </svg>    
                                            </h2>
                                            <h5 class="card-title">Vacancies</h5>
                                            <p class="card-text">
                                                The number of vacancies in the Israeli market is 126,804
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>


            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Career market status
                    </h1>
                    
                        <div class="container text-center mt-8">
                            <div class="row mb-4">
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pie-chart-fill" viewBox="0 0 16 16">
                                                    <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"/>
                                                </svg>
                                            </h2>
                                            <h5 class="card-title">Unemployed</h5>
                                                <p class="card-text">
                                                    The percentage of unemployed residents in Israel is 3.9
                                                </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
                                            </svg>
                                                
                                            </h2>
                                            <h5 class="card-title">Israeli employees</h5>
                                            <p class="card-text">
                                                The number of employed Israelis is 4.316 in millions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="card h-100"> 
                                        <div class="card-body">
                                            <h2 class="card-title countNumber">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                                </svg>    
                                            </h2>
                                            <h5 class="card-title">Vacancies</h5>
                                            <p class="card-text">
                                                The number of vacancies in the Israeli market is 126,804
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
        );
}