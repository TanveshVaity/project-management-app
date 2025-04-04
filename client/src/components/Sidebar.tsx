"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../public/logo.png";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import SidebarLink from "./SidebarLinks";
import { useGetProjectsQuery } from "@/state/api";

const Sidebar = () =>{
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);

    const { data : projects } = useGetProjectsQuery();
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto overflow-x-hidden bg-white
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

    return (
        <div className={sidebarClassNames} >
            <div className="flex h-[100%]  w-full flex-col justify-start">
                <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
                    <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        EDLIST
                    </div>
                    {isSidebarCollapsed ? null : (
                        <button
                        className="py-3"
                        onClick={() => {
                            dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                        }}
                        >
                        <X className="h-6 w-6 text-gray-800 cursor-pointer hover:text-gray-500 dark:text-white" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700 ">
                    <Image src={Logo} alt="logo" width={40} height={40}/>
                    <div>
                        <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                            Tan Team
                        </h3>
                        <div className="mt-1 flex items-start gap-2">
                            <LockIcon  className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"/>
                            <p className="text-xs text-gray-500">Private</p>
                        </div>
                    </div>
                </div>

                <nav className="z-10 w-full">
                    <SidebarLink icon={Home} label="Home" href="/" />
                    <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
                    <SidebarLink icon={Search} label="Search" href="/search" />
                    <SidebarLink icon={Settings} label="Settings" href="/settings" />
                    <SidebarLink icon={User} label="Users" href="/users" />
                    <SidebarLink icon={Users} label="Teams" href="/teams" />
                </nav>

                <button
                    onClick={() => setShowProjects((prev) => !prev)}
                    className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                    <span className="">Projects</span>
                    {showProjects ? (
                        <ChevronUp className="h-5 w-5 cursor-pointer" />
                    ) : (
                        <ChevronDown className="h-5 w-5 cursor-pointer" />
                    )}
                </button>
                {showProjects && projects?.map((project) => (
                    <SidebarLink 
                        key={project.id} 
                        icon={Briefcase} 
                        label={project.name} 
                        href={`/projects/${project.id}`} 
                    />
                ))}

                <button
                    onClick={() => setShowPriority((prev) => !prev)}
                    className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
                >
                    <span className="">Priority</span>
                    {showPriority ? (
                        <ChevronUp className="h-5 w-5 cursor-pointer" />
                    ) : (
                        <ChevronDown className="h-5 w-5 cursor-pointer" />
                    )}
                </button>
                {showPriority && (
                    <>
                        <SidebarLink icon={AlertCircle} label="Urgent" href="/priority/urgent" />
                        <SidebarLink icon={ShieldAlert} label="High" href="/priority/high" />
                        <SidebarLink icon={AlertTriangle} label="Medium" href="/priority/medium" />
                        <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
                        <SidebarLink icon={Layers3} label="Backlog" href="/priority/backlog" />
                    </>
                )}
            </div>
        </div>
    )
}
  
export default Sidebar;