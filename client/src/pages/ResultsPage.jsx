import {useContext, useState, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";
import {Navigate, Link} from "react-router-dom";

export default function ResultsPage() {
    const {ready, user} = useContext(UserContext);
    const [results, setResults] = useState([]);
    const [occToPass,setOccToPass] = useState(null);


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

    async function handleTabClick(occupName) {
        try {
            console.log("in onclick");
            console.log(occupName);
            const {data} = await axios.get("/api/occupations", { 
                params: { Description: occupName } 
            });
            const occupCode = data.Code;
            console.log(data);
            setOccToPass([occupName, occupCode]);
        } catch (e) {
            console.log(e);
        }
    };

    const Tab = ({ res, onClick }) => {
        const tabStyle = {
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid gray',
          cursor: 'pointer',
          marginRight: '20px',
          width: '200px'
        };
      
        return (
          <div style={tabStyle} onClick={onClick}>
            {res}
          </div>
        );
    };

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
        return (<div className="d-flex flex-column align-items-center justify-content-center mt-40">
                    <div className="row mb-10">
                        <div className="spinner-border text-success" style={{width: 150, height: 150}} role="status">
                        </div>
                    </div>
                    <div className="row mt-10">
                        <h1 className="font-bold tracking-tight text-gray-900" style={{ fontSize: "2rem" }}>Loading...</h1>
                    </div>
                </div>);
    }

    if (results.length < 1) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center mt-40">
                <div className="row mb-10">
                    <div className="spinner-border text-success" style={{width: 150, height: 150}} role="status">
                    </div>
                </div>
                <div className="row mt-10">
                    <h1 className="font-bold tracking-tight text-gray-900" style={{ fontSize: "2rem" }}>We process your answers...</h1>
                </div>
            </div>
       );
    }


    if (occToPass) {
        const id = occToPass[1]; // occupation code
        console.log(id);
        return <Navigate to={'/job/'+id} state={{occupation_title : occToPass}}/>;
    }

    
    return (
        <div className="mt-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Your Recommendations:
                </h1>
            </div>
            <div className="card-deck mt-20">
                {results.map((result) => (
                    <div className="card border-success mb-3 text-center shadow-md shadow-gray-300" style={{width: "150px", height: "200px", cursor: 'pointer'}} onClick={() => handleTabClick(result)}>
                        <p className="card-text font-bold mt-14">{result}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}