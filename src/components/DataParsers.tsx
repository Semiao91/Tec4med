import BasicCard from './Card';

export interface Project {
    id: number;
    title: string;
    deviceCount: number;
    userCount: number;
    beginDate: string;
    expirationDate: string;
    description?: string;
    deviceSerialNumbers?: string[];
}

export interface UpdatedProject extends Project {
    ModalProjectName: string;
    ModalprojectDescription: string;
    ModalStartDate: string;
    ModalEndDate: string;

}
type onDeleteType = (projectId: number) => void;
type onModalType = (projectId: number) => void;

interface MainComponentProps {
    project: Project;
    onDelete: onDeleteType;
    onModal: onModalType;
    onUpdate: (updatedProject: UpdatedProject) => void;
}

function MainComponent({ project, onDelete, onModal, onUpdate }: MainComponentProps) {
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
            onUpdate={onUpdate}
            deviceSerialNumbers={project.deviceSerialNumbers}
            updatedProject={function (projectID: number): void {
                throw new Error('Function not implemented.');
            }} />

    );
}

export default MainComponent;
