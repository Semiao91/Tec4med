import React from 'react';
import BasicCard from './Card';

interface Project {
    id: number;
    title: string;
    deviceCount: number;
    userCount: number;
    beginDate: string;
    expirationDate: string;
}
type onDeleteType = (projectId: number) => void;
type onModalType = (projectId: number) => void;

interface MainComponentProps {
    project: Project;
    onDelete: onDeleteType;
    onModal: onModalType;
}

function MainComponent({ project, onDelete, onModal }: MainComponentProps) {
    return (
        <BasicCard
            projectId={project.id}
            projectName={project.title}
            deviceCount={project.deviceCount || 0}
            userCount={project.userCount || 0}
            startDate={project.beginDate || ''}
            endDate={project.expirationDate || 'N/'}
            onDelete={onDelete}
            onModal={onModal}
        />
    );
}

export default MainComponent;
