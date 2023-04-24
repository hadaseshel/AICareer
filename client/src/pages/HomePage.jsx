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
            <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
            >
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            </div>
            <div className="mx-auto max-w-2xl py-8 sm:py-26 lg:py-30">
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
                                                The number of occupations in the system.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollTrigger>
                </div>
            </div>
            <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
            >
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            </div>
        </div>
        );
}