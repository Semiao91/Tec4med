import { useState } from 'react';
import { Box, Modal, Typography, TextField, Stack, Button } from '@mui/material';


const [open, setOpen] = useState(false);

const handleClose = () => setOpen(false);

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


export const EditModal = (
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
            <TextField id="project-name" label="Project Name" variant="standard" fullWidth />
            <TextField id="project-description" label="Description (Max 20 chars)" variant="standard" fullWidth />
            <TextField id="project-start-date" label="Start Date" variant="standard" fullWidth />
            <TextField id="project-end-date" label="End Date" variant="standard" fullWidth />
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary">Save</Button>
            </Stack>
        </Box>
    </Modal>
);