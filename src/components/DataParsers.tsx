import BasicCard from './Card';
import { MainComponentProps } from '../interfaces/interfaces';

function MainComponent({ project, onDelete, onUpdate }: MainComponentProps) {
    const { id, title, description, deviceCount, userCount, beginDate, expirationDate, deviceSerialNumbers, userNames } = project;

    return (
        <BasicCard
            projectId={id}
            projectName={title}
            description={description}
            deviceCount={deviceCount || 0}
            userCount={userCount || 0}
            startDate={beginDate || ''}
            endDate={expirationDate || 'N/A'}
            deviceSerialNumbers={deviceSerialNumbers}
            userNames={userNames}
            onDelete={onDelete}
            onUpdate={onUpdate}
            updatedProject={function (projectID: number): void {
            }} />
    );
}

export default MainComponent;
