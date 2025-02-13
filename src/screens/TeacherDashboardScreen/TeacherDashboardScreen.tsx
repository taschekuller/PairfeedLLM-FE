import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Modal,
    TextField,
    Button,
    Fab,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    Grid2,
    Avatar,
    Tooltip,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    Help as HelpIcon,
    AccountCircle,
    SchoolOutlined,
    Add as AddIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const MiniDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    '&.closed': {
        '& .MuiDrawer-paper': {
            width: theme.spacing(7),
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: -50,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const courses = [
    {
        id: 1,
        code: 'CEIT210',
        name: 'Programming Languages',
        students: 45,
        description: 'Introduction to various programming paradigms and languages',
    },
    {
        id: 2,
        code: 'CEIT310',
        name: 'Web Development',
        students: 38,
        description: 'Frontend and backend web development technologies',
    },
    // Add more courses as needed
];

export default function TeacherDashboardScreen() {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        code: '',
        name: '',
        description: '',
    });

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Handle course creation logic here
        console.log('New course:', newCourse);
        handleModalClose();
        setNewCourse({ code: '', name: '', description: '' });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        👋 Hey there, Erkan!
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <MiniDrawer
                variant="permanent"
                className={!open ? 'closed' : ''}
                open={open}
            >
                <Toolbar />
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon /> },
                        { text: 'Students', icon: <PeopleIcon /> },
                        { text: 'Help', icon: <HelpIcon /> },
                    ].map((item) => (
                        <ListItem button key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItem>
                    ))}
                </List>
            </MiniDrawer>

            {/* Create Course Modal */}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="create-course-modal"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Create New Course
                    </Typography>
                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Course Code"
                            name="code"
                            value={newCourse.code}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Course Name"
                            name="name"
                            value={newCourse.name}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={newCourse.description}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button onClick={handleModalClose}>Cancel</Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!newCourse.code || !newCourse.name}
                            >
                                Create Course
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Main open={open}>
                <Toolbar />
                <Button onClick={handleModalOpen} startIcon={<AddIcon />} sx={{ mb: 2 }}>
                    Create Course
                </Button>
                <Grid2
                    container
                    spacing={3}
                    style={{ marginLeft: modalOpen ? '0px' : '36px' }}>
                    {courses.map((course) => (
                        <Grid2 item xs={12} sm={6} md={4} key={course.id}>
                            <Tooltip title={course.description} arrow>
                                <Card sx={{
                                    minHeight: 200,
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 3,
                                    }
                                }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <SchoolOutlined sx={{ mr: 1 }} />
                                            <Typography variant="h6" component="div">
                                                {course.code}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" color="text.secondary" gutterBottom>
                                            {course.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Students: {course.students}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Tooltip>
                        </Grid2>
                    ))}
                </Grid2>
            </Main>
        </Box >
    );
}