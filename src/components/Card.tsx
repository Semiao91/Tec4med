import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonIcon from '@mui/icons-material/Person';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';

interface BasicCardProps {
    projectId: number;
    projectName: string;
    deviceCount: number;
    userCount: number;
    startDate: string;
    endDate: string;
    onDelete: (projectId: number) => void;
    onModal: (projectID: number) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicCard({
    projectId,
    projectName,
    deviceCount,
    userCount,
    startDate,
    endDate,
    onDelete,
    onModal
}: BasicCardProps) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Typography>Devices: {deviceCount}
                        <IconButton aria-label="delete" size="small">
                            <DevicesIcon fontSize="inherit" />
                        </IconButton>
                    </Typography>
                    <Typography>Users: {userCount}
                        <IconButton aria-label="delete" size="small">
                            <PersonIcon fontSize="inherit" />
                        </IconButton>
                    </Typography>
                </Typography>
                <Typography variant="body2">
                    Description:
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
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
            <CardActions>
                <Typography variant="body2">
                    <Typography>Date Start: {startDate.substring(0, 10)}</Typography>
                    <Typography>Date End: {endDate.substring(0, 10)}</Typography>
                </Typography>
            </CardActions>
        </Card>
    );
}
