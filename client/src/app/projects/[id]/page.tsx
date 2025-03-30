"use client";
import ProjectHeader from "@/app/projects/ProjectHeader";
import { useState } from "react";

type Props = {
    params : { id : string },
}

const Project = ({params} : Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState("Board");
    const [ isModelNewTaskOpen, setIsModelNewTaskOpen ] = useState(false); 
    
    return (
        <div>
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
    );
}

export default Project;