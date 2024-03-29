import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainComponent from "./DataParsers";
import { mainListItems } from './SidebarButtons';
import Table from './Table';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { User, Device, Project, UpdatedProject, TableDataItem } from '../interfaces/interfaces';



function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.tec4med.com/">
                Tec4med
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const defaultTheme = createTheme();

export default function Dashboard() {



    const [projects, setProjects] = useState<Project[]>([]);
    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    const [currentView, setCurrentView] = useState<'dashboard' | 'users'>('dashboard');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const handleDialogOpen = (projectId: number) => {
        setSelectedProjectId(projectId);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const confirmDelete = () => {
        if (selectedProjectId !== null) {
            handleDelete(selectedProjectId);
            handleDialogClose();
        }
    };

    function updateProjectData(updatedProject: UpdatedProject) {
        setProjects(prevProjects => prevProjects.map(project =>
            project.id === updatedProject.id ? updatedProject : project
        ));
    }

    const handleDelete = (projectId: number) => {
        const updatedProjects = projects.filter(project => project.id !== projectId);
        setProjects(updatedProjects);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectResponse = await fetch('/data/project.json');
                const projectData: Project[] = await projectResponse.json();

                const deviceResponse = await fetch('/data/device.json');
                const deviceData: Device[] = await deviceResponse.json();

                const userResponse = await fetch('/data/user.json');
                const userData: User[] = await userResponse.json();

                const processedProjects = projectData.map((project: Project) => {
                    const devices = deviceData.filter((device: Device) => device.projectId === project.id);
                    const deviceCount = devices.length;
                    const users = userData.filter((user: User) => user.projectId === project.id);
                    const userCount = users.length;
                    const deviceSerialNumbers = devices.map(device => device.serialNumber.toString());
                    const userNames = users.map(user => user.firstName + " " + user.lastName);

                    return { ...project, deviceCount, userCount, deviceSerialNumbers, userNames };
                });

                const tableData: TableDataItem[] = [];

                processedProjects.forEach(project => {
                    project.userNames.forEach((userName, index) => {
                        const device = project.deviceSerialNumbers[index] || 'No Device';
                        tableData.push({
                            userName: userName,
                            projectName: project.title,
                            device: device
                        });
                    });
                });

                setTableData(tableData);
                setProjects(processedProjects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProjects();
    }, []);



    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px",
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Tech4Med
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems(setCurrentView)}
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        {currentView === 'users' && (
                            <Box>
                                <Table data={tableData} />
                            </Box>
                        )}
                        {currentView === 'dashboard' && (
                            <Grid container spacing={4}>
                                {projects.map((project, index) => (
                                    <Grid item xs={12} md={6} lg={4} key={index}>
                                        <MainComponent
                                            project={project}
                                            onDelete={() => handleDialogOpen(project.id)}
                                            onUpdate={updateProjectData}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>

    );
}
