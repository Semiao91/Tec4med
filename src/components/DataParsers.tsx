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

interface MainComponentProps {
    project: Project;
    onDelete: onDeleteType;
}

function MainComponent({ project, onDelete }: MainComponentProps) {
    return (
        <BasicCard
            projectId={project.id}
            projectName={project.title}
            deviceCount={project.deviceCount || 0}
            userCount={project.userCount || 0}
            startDate={project.beginDate || ''}
            endDate={project.expirationDate || 'N/'}
            onDelete={onDelete}
        />
    );
}

export default MainComponent;
