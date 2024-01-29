import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BasicCardProps {
    projectName: string;
    deviceCount: number;
    userCount: number;
    startDate: string;
    endDate: string;
}

export default function BasicCard({
    projectName,
    deviceCount,
    userCount,
    startDate,
    endDate
}: BasicCardProps) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Project Name
                </Typography>
                <Typography variant="h5" component="div">
                    {projectName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Devices: {deviceCount}
                    Users: {userCount}
                </Typography>
                <Typography variant="body2">
                    Description:
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
                <Typography variant="body2">
                    <Typography>Date Start:</Typography> {startDate.substring(0, 10)}
                    <Typography>Date End:</Typography>  {endDate.substring(0, 10)}
                </Typography>
            </CardActions>
        </Card>
    );
}
