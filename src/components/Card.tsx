import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Box, Modal, Typography, TextField, Stack, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UpdatedProject, Project } from './DataParsers';

interface BasicCardProps {
    projectId: number;
    projectName: string;
    deviceCount: number;
    userCount: number;
    startDate: string;
    endDate: string;
    onDelete: (projectId: number) => void;
    onModal: (projectID: number) => void;
    onUpdate: (updatedProject: UpdatedProject) => void;
    updatedProject: (projectID: number) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    maxWidth: '90vw',
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

export default function BasicCard({
    projectId,
    projectName,
    deviceCount,
    userCount,
    startDate,
    endDate,
    onDelete,
    onUpdate,
}: BasicCardProps) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [ModalProjectName, setProjectName] = useState('');
    const [ModalprojectDescription, setProjectDescription] = useState('');
    const [ModalStartDate, setStartDate] = useState("");
    const [ModalEndDate, setEndDate] = useState("");

    const handleSave = () => {
        const updatedProject: Project = {
            id: projectId,
            title: ModalProjectName,
            description: ModalprojectDescription, // Assuming this is a new field
            deviceCount: deviceCount, // These should be passed to the BasicCard
            userCount: userCount,   // These should be passed to the BasicCard
            beginDate: ModalStartDate,
            expirationDate: ModalEndDate,
        };

        onUpdate(updatedProject);
        handleClose();
    };


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Project Name
                    </Typography>
                    <Box>
                        <IconButton aria-label="delete" size="small" onClick={() => onDelete(projectId)}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="edit" size="small" onClick={handleOpen}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                </Box>
                <Typography variant="h5" component="div">
                    {projectName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Devices: {deviceCount}
                    <IconButton aria-label="devices" size="small">
                        <DevicesIcon fontSize="inherit" />
                    </IconButton>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Users: {userCount}
                    <IconButton aria-label="users" size="small">
                        <PersonIcon fontSize="inherit" />
                    </IconButton>
                </Typography>
                <Typography variant="body2">
                    Description: {ModalprojectDescription}
                </Typography>
            </CardContent>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Project
                    </Typography>
                    <TextField
                        id="project-name"
                        label="Project Name"
                        variant="standard"
                        fullWidth
                        value={ModalProjectName}
                        onChange={e => setProjectName(e.target.value)}
                    />
                    <TextField
                        id="project-description"
                        label="Description (Max 20 chars)"
                        variant="standard"
                        fullWidth
                        value={ModalprojectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2">Set Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={ModalStartDate} onChange={(newValue) => setStartDate(newValue?.toString())} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={ModalEndDate} onChange={(newValue) => setEndDate(newValue?.toString())} />
                    </LocalizationProvider>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    </Stack>
                </Box>
            </Modal>
            <CardContent>
                <Typography variant="body2">Date Start: {startDate.substring(0, 10)}</Typography>
                <Typography variant="body2">Date End: {endDate.substring(0, 10)}</Typography>
            </CardContent>
        </Card >
    );
}
