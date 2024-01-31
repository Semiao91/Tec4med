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
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { BasicCardProps, Project } from '../interfaces/interfaces';


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
    deviceSerialNumbers,
    userNames,
    description,
    onDelete,
    onUpdate,
}: BasicCardProps) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setProjectName(projectName);
        setProjectDescription(description);
        setStartDate(dayjs(startDate));
        setEndDate(dayjs(endDate));
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [ModalProjectName, setProjectName] = useState('');
    const [ModalprojectDescription, setProjectDescription] = useState('');
    const [ModalStartDate, setStartDate] = useState("");
    const [ModalEndDate, setEndDate] = useState("");

    const handleSave = () => {
        const updatedProject: Project = {
            id: projectId,
            title: ModalProjectName,
            description: ModalprojectDescription,
            deviceCount: deviceCount,
            userCount: userCount,
            userNames: userNames,
            deviceSerialNumbers: deviceSerialNumbers,
            beginDate: ModalStartDate.format('YYYY-MM-DD'),
            expirationDate: ModalEndDate.format('YYYY-MM-DD'),
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
                    <Tooltip
                        title={
                            deviceSerialNumbers && deviceSerialNumbers.length > 0
                                ? <span dangerouslySetInnerHTML={{ __html: deviceSerialNumbers.join('<br />') }} />
                                : "No devices active"
                        }
                        placement='right'
                    >
                        <IconButton aria-label="devices" size="small">
                            <DevicesIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Users: {userCount}
                    <Tooltip
                        title={
                            userNames && userNames.length > 0
                                ? <span dangerouslySetInnerHTML={{ __html: userNames.join('<br />') }} />
                                : "No users active"
                        }
                        placement='right'
                    >
                        <IconButton aria-label="devices" size="small">
                            <PersonIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Typography variant="body2">
                    Description: {description}
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
                        Edit Project:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {projectName}
                    </Typography>
                    <TextField
                        id="project-name"
                        label="Project Name (Mx. 20 chars)"
                        variant="standard"
                        inputProps={{ maxLength: 20 }}
                        fullWidth
                        value={ModalProjectName}
                        onChange={e => setProjectName(e.target.value)}
                    />
                    <TextField
                        id="project-description"
                        label="Description (Mx. 40 chars)"
                        variant="standard"
                        inputProps={{ maxLength: 40 }}
                        fullWidth
                        value={ModalprojectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                    />
                    <Typography id="modal-modal-title" variant="h6" component="h2">Set Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={ModalStartDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={ModalEndDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
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
