export interface Project {
    id: number;
    title: string;
    deviceCount: number;
    description: string;
    userCount: number;
    beginDate?: string;
    expirationDate?: string;
    deviceSerialNumbers?: string[];
    userNames?: string[];
}

export interface Device {
    deviceId: number;
    projectId: number;
}

export interface User {
    userId: number;
    projectId: number;
}

export interface UpdatedProject extends Project {
    ModalProjectName: string;
    ModalprojectDescription: string;
    ModalStartDate: string;
    ModalEndDate: string;
}

export interface MainComponentProps {
    project: Project;
    onDelete: onDeleteType;
    onUpdate: (updatedProject: UpdatedProject) => void;
}

export interface BasicCardProps {
    projectId: number;
    projectName: string;
    description: string;
    deviceCount: number;
    userCount: number;
    startDate: string;
    endDate: string;
    deviceSerialNumbers?: string[];
    userNames?: string[];
    onDelete: (projectId: number) => void;
    onUpdate: (updatedProject: UpdatedProject) => void;
    updatedProject: (projectID: number) => void;
}


type onDeleteType = (projectId: number) => void;
