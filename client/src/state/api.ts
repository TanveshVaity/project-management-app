import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { create } from 'domain';

export interface Project{
    id : number;
    name : string;
    description ?: string;
    startDate ?: string;
    endDate ?: string;
}

export enum Status{
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
}

export enum Priority{
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}

export interface User{
    userId : number;
    username : string;
    congnitoId : String;
    profilePictureUrl ?: string;
    teamId : number;
}

export interface Comment{
    id : number;
    text : string;
    userId : number;
    taskId : number;
    createdAt : string;
    user ?: User;
}

export interface Attachment{
    id : number;
    fileURL : string;
    fileName : string;
    taskId : number;
    uploadedById : number;
}

export interface Task{
    id : number;
    title : string;
    description ?: string; 
    priority : Priority;
    status : Status;
    tags : string;
    startDate : string;
    dueDate : string;
    points : number;
    projectId : number;
    authorUserId : number;
    assignedUserId : number;

    author ?: User;
    assignee ?: User;
    comments ?: Comment[];
    attachments ?: Attachment[];
}

export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath : "api",
    tagTypes : ["Projects", "Tasks"],
    endpoints : (build) => ({
        getProjects : build.query<Project[], void>({
            query : () => "projects",
            providesTags : ["Projects"],
        }),
        createProject : build.mutation<Project, Partial<Project>>({
            query : (project) => ({url : "projects", method : "POST", body : project}),
            invalidatesTags : ["Projects"],
        }),
        
        getTasks : build.query<Task[], {projectId : number}>({
            query : ({projectId}) => `tasks?projectId=${projectId}`,
            providesTags : (result) => result ? result.map(({id}) => ({type : "Tasks" as const, id})) : [{type : "Tasks" as const}],
        }),
        createTask : build.mutation<Task, Partial<Task>>({
            query : (task) => ({url : "tasks", method : "POST", body : task}),
            invalidatesTags : ["Tasks"],
        }),
        updateStatus: build.mutation<Task, {taskId : number, status : Status}>({
            query : ({taskId, status}) => ({url : `tasks/${taskId}/status`, method : "PATCH", body : {status}}),
            invalidatesTags : (result, error, {taskId}) => [{type : "Tasks" as const, id : taskId}],
        }),
    }),
})

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTaskMutation} = api;