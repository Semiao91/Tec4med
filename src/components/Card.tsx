import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard() {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Project
                </Typography>
                <Typography variant="h5" component="div">
                    Project Name
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Devices: {/*X*/}
                    Users: {/*X*/}
                </Typography>
                <Typography variant="body2">
                    Description as dasd asd asd as asd asd
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
                <Typography variant="body2">
                    Date Start: {/* 52 */}
                    Date End: {/* 52 */}
                </Typography>
            </CardActions>
        </Card>
    );
}