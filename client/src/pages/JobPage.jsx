import { useState, useEffect } from "react";
import {useParams,Link, Navigate} from "react-router-dom";
import axios from "axios";

import { Table } from "./Job components/TableOfJob";

export default function JobPage() {
    const {id} = useParams();
    const [occupationName, setOccupationName] = useState("");
    const [occupation, setOccupation] = useState({});
    const [isLoading, setIsLoading] = useState(0);
    const [rowsWorkActivities, setRowsWorkActivitie] = useState([]);
    const [rowsKnowledge, setRowsKnowledge] = useState([]);
    const [rowsSkills, setRowsSkills] = useState([]);

    useEffect(() => {
        async function fetchOccupation() {
            try {
                const {data} = await axios.get("/api/occupations/Code", { params: { Code:  id} });
                setOccupation(data);
                setOccupationName(data.Description)
                const work_activities = data.Work_Activities;
                const rowWork_activitiess = work_activities.map(item => ({
                    _id: item._id,
                    Importance: item.Importance,
                    name: item.Work_Activity,         
                    description: item.Work_Activity_Description
                }));
                setRowsWorkActivitie(rowWork_activitiess);
                const knowledge = data.Knowledge;
                const rowKnowledge = knowledge.map(item => ({
                    _id: item._id,
                    Importance: item.Importance,
                    name: item.Knowledge,         
                    description: item.Knowledge_Description
                }));
                setRowsKnowledge(rowKnowledge);
                const skills = data.Skills;
                const rowSkills = skills.map(item => ({
                    _id: item._id,
                    Importance: item.Importance,
                    name: item.Skill,         
                    description: item.Skill_Description
                }));
                setRowsSkills(rowSkills);
            } catch (e) {
                console.log(e);
            } finally{
                setIsLoading(1);
            }
        }
        fetchOccupation();   
        }, []);
    
    if (isLoading != 1) {
        return(
            <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Loading...
                    </h1>
                </div>
            </div>
        );
    }

    if (occupation == null) {
        return <Navigate to={'/notfound'}/>;
    }
    
    return (
        <div>
             <div className="mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
                    {occupationName}
                </h1>
            </div>
            <div className="mt-16">
                <h1 className="title text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                    Work Activities
                </h1>
                <Table rows={rowsWorkActivities} firstTh={"Work Activity"} secondTh={"Description"} thirdTh={"Importance"}/>
            </div>
            <div className="mt-16">
                <h1 className="title text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                    Skills
                </h1>
                <Table rows={rowsSkills} firstTh={"Skill"} secondTh={"Description"} thirdTh={"Importance"}/>
            </div>
            <div className="mt-16">
                <h1 className="title text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                    Knowledge
                </h1>
                <Table rows={rowsKnowledge} firstTh={"Knowledge"} secondTh={"Description"} thirdTh={"Importance"}/>
            </div>
        </div>
    );
}