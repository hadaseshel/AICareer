
import {Link} from "react-router-dom";
import ReactCounUp,{CountUp } from 'react-countup'
import { useRef, useEffect } from "react";
import {useContext, useState} from "react";
import axios from "axios";
import ScrollTrigger from 'react-scroll-trigger'

export default function HomePage() {

    const [isLoading, setIsLoading] = useState(true);

    const [titleOfDescription, setTitleOfDescription] = useState(null);
    const [text1OfDescription, setText1OfDescription] = useState(null);
    const [text2OfDescription, setText2OfDescription] = useState(null);
    const [text3OfDescription, setText3OfDescription] = useState(null);

    const [titleOfNumbers, setTitleOfNumbers] = useState("");
    const [title1OfNumbers, setTitle1OfNumbers] = useState("");
    const [text1OfNumbers, setText1OfNumbers] = useState("");
    const [title2OfNumbers, setTitle2OfNumbers] = useState("");
    const [text2OfNumbers, setText2OfNumbers] = useState("");
    const [title3OfNumbers, setTitle3OfNumbers] = useState("");
    const [text3OfNumbers, setText3OfNumbers] = useState("");

    const [titleOfMarket, setTitleOfMarket] = useState("");
    const [title1OfMarket, setTitle1OfMarket] = useState("");
    const [text1OfMarket, setText1OfMarket] = useState("");
    const [title2OfMarket, setTitle2OfMarket] = useState("");
    const [text2OfMarket, setText2OfMarket] = useState("");
    const [title3OfMarket, setTitle3OfMarket] = useState("");
    const [text3OfMarket, setText3OfMarket] = useState("");

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfOccupations, setNumberOfOccupations] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [counterOn, setCounterOn]= useState(false);
 
    // put the data of section Description in the page
    function putSectionOfDescription(data) {
        setTitleOfDescription(data.title);
        setText1OfDescription(data.text1);
        setText2OfDescription(data.text2);
        setText3OfDescription(data.text3);
    }

    // put the data of section Numbers in the page
    function putSectionOfNumbers(data) {
        setTitleOfNumbers(data.title);
        setTitle1OfNumbers(data.title1);
        setText1OfNumbers(data.text1);
        setTitle2OfNumbers(data.title2);
        setText2OfNumbers(data.text2);
        setTitle3OfNumbers(data.title3);
        setText3OfNumbers(data.text3);
    }

    // put the data of section Market in the page
    function putSectionOfMarket(data) {
        setTitleOfMarket(data.title);
        setTitle1OfMarket(data.title1);
        setText1OfMarket(data.text1);
        setTitle2OfMarket(data.title2);
        setText2OfMarket(data.text2);
        setTitle3OfMarket(data.title3);
        setText3OfMarket(data.text3);
    }

    useEffect(() => {
        // function that will get the vaule in path and put that data by the satFunc
        async function getNumberOf(setFunc,path) {
            try {
                const {data} = await axios.get(path, {});
                setFunc(data)
            } catch (e) {
                console.log(e)
            }
        }

        async function getSectionOf(setFunc,path, depSection) {
            try {
                const {data} = await axios.get(path, { params: { section: depSection } });
                setFunc(data)
            } catch (e) {
                console.log(e)
            }
        }

        getSectionOf(putSectionOfDescription,'/api/home', "description")
        getSectionOf(putSectionOfNumbers,'/api/home', "numbers of app")
        getSectionOf(putSectionOfMarket,'/api/home', "market status")

        getNumberOf(setNumberOfUsers,'/api/users');
        getNumberOf(setNumberOfOccupations,'/api/occupations');
        getNumberOf(setNumberOfQuestions,'/api/questionnaire');
        setIsLoading(false)
    },[]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {titleOfDescription}
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-gray-800">
                       {text1OfDescription}
                    </p>
                    <p className="mt-6 text-xl leading-8 text-gray-800">
                        {text2OfDescription}
                    </p>
                    <div className="mt-10 gap-x-6">
                        <button className="btn btn-success">{text3OfDescription}</button>
                    </div>
                </div>
            </div>

       

            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {titleOfNumbers}
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
                                            <h5 class="card-title">{title1OfNumbers}</h5>
                                                <p class="card-text">
                                                    {text1OfNumbers}
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
                                            <h5 class="card-title">{title2OfNumbers}</h5>
                                            <p class="card-text">
                                                {text2OfNumbers}
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
                                            <h5 class="card-title">{title3OfNumbers}</h5>
                                            <p class="card-text">
                                               {text3OfNumbers}
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
                    {titleOfMarket}
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
                                            <h5 class="card-title">{title1OfMarket}</h5>
                                                <p class="card-text">
                                                    {text1OfMarket}
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
                                            <h5 class="card-title">{title2OfMarket}</h5>
                                            <p class="card-text">
                                                {text2OfMarket}
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
                                            <h5 class="card-title">{title3OfMarket}</h5>
                                            <p class="card-text">
                                                {text3OfMarket}
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
>>>>>>> 756cae4 (fix rebase)
