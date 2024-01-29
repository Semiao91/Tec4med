import React from 'react';
import BasicCard from './Card';

interface Project {
    id: number;
    title: string;
    deviceCount?: number;
    userCount?: number;
    beginDate?: string;
    expirationDate?: string;
}

interface MainComponentProps {
    project: Project;
}

function MainComponent({ project }: MainComponentProps) {
    return (
        <BasicCard
            key={project.id}
            projectName={project.title}
            deviceCount={project.deviceCount || 0}
            userCount={project.userCount || 0}
            startDate={project.beginDate || ''}
            endDate={project.expirationDate || 'No Date'}
        />
    );
}

export default MainComponent;
