import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import DevicesIcon from '@mui/icons-material/Devices';

type ViewType = 'dashboard' | 'users';

export const mainListItems = (setCurrentView: (view: ViewType) => void) => (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Overview
        </ListSubheader>
        <ListItemButton onClick={() => setCurrentView('dashboard')}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => setCurrentView('users')}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <DevicesIcon />
            </ListItemIcon>
            <ListItemText primary="Devices" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
        </ListItemButton>
    </React.Fragment>
);

