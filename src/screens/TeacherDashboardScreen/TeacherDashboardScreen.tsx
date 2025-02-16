import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Modal,
    TextField,
    Button,
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
    Tooltip,
    Tab,
    Tabs,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListItemButton
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { SchoolOutlined } from '@mui/icons-material';

import {
    Menu as MenuIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    Help as HelpIcon,
    AccountCircle,
    Add as AddIcon,
} from '@mui/icons-material';

interface Assignment {
    id: string;
    courseId: string;
    title: string;
    description: string;
    aiPedagogicInstructions: string,
    aiFeedbackCharacteristics: string;
    deadline: dayjs.Dayjs;
}

interface Course {
    id: string;
    code: string;
    name: string;
    students: number;
    description: string;
}

const drawerWidth = 240;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 2,
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
    padding: theme.spacing(2),

    marginLeft: `-${drawerWidth - 48}px`,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const courses = [
    {
        id: "1",
        code: 'CEIT210',
        name: 'Programming Languages',
        students: 45,
        description: 'Introduction to various programming paradigms and languages',
    },
    {
        id: "2",
        code: 'CEIT419',
        name: 'Web Development',
        students: 38,
        description: 'Frontend and backend web development technologies',
    },
];



export default function TeacherDashboardScreen() {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        id: '',
        code: '',
        name: '',
        students: 0,
        description: '',
    });
    const [currentTab, setCurrentTab] = useState(0);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        description: '',
        aiPedagogicInstructions: '',
        aiFeedbackCharacteristics: '',
        deadline: dayjs(),
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleAssignmentModalOpen = (course: Course) => {
        setSelectedCourse(course);
        setAssignmentModalOpen(true);
    };

    const handleAssignmentModalClose = () => {
        setAssignmentModalOpen(false);
        setSelectedCourse(null);
        setNewAssignment({
            title: '',
            description: '',
            aiPedagogicInstructions: '',
            aiFeedbackCharacteristics: '',
            deadline: dayjs(),
        });
    };
    const handleAssignmentSubmit = () => {
        if (selectedCourse) {
            const newAssignmentItem: Assignment = {
                id: (assignments.length + 1).toString(),
                courseId: selectedCourse.id,
                title: newAssignment.title,
                description: newAssignment.description,
                aiPedagogicInstructions: newAssignment.aiPedagogicInstructions,
                aiFeedbackCharacteristics: newAssignment.aiFeedbackCharacteristics,
                deadline: newAssignment.deadline,
            };
            setAssignments([...assignments, newAssignmentItem]);
            handleAssignmentModalClose();
        }
    };

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
        handleModalClose();
        setNewCourse(newCourse => ({
            ...newCourse,
            id: (courses.length + 1).toString(),
            code: '',
            name: '',
            students: Number(0),
            description: ''
        }));
        courses.push(newCourse);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                style={{ backgroundColor: '#d02031' }}>
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
                        <ListItem key={item.text}>
                            <ListItemButton style={{ padding: 0 }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
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
                            label="Number of Students"
                            name="students"
                            value={newCourse.students}
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

            {/* Create Assignment Modal  */}
            <Modal
                open={assignmentModalOpen}
                onClose={handleAssignmentModalClose}
                aria-labelledby="create-assignment-modal"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Create New Assignment for {selectedCourse?.code}
                    </Typography>
                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Assignment Title"
                            name="title"
                            value={newAssignment.title}
                            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={newAssignment.description}
                            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Pedagogic Instructions for AI"
                            name="aiPedagogicInstructions"
                            value={newAssignment.aiPedagogicInstructions}
                            onChange={(e) => setNewAssignment({ ...newAssignment, aiPedagogicInstructions: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />
                        <TextField
                            fullWidth
                            label="AI Feedback Characteristics"
                            name="aiFeedbackCharacteristics"
                            value={newAssignment.aiFeedbackCharacteristics}
                            onChange={(e) => setNewAssignment({ ...newAssignment, aiFeedbackCharacteristics: e.target.value })}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Deadline"
                                value={newAssignment.deadline}
                                onChange={(newValue) =>
                                    setNewAssignment({
                                        ...newAssignment,
                                        deadline: newValue || dayjs()
                                    })
                                }
                                sx={{ mt: 2, width: '100%' }}
                            />
                        </LocalizationProvider>
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button onClick={handleAssignmentModalClose}>Cancel</Button>
                            <Button
                                variant="contained"
                                onClick={handleAssignmentSubmit}
                                disabled={!newAssignment.title || !newAssignment.description}
                            >
                                Create Assignment
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Main open={open}>
                <Toolbar />
                <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
                    <Tab label="Lectures" />
                    <Tab label="Assignments" />
                </Tabs>

                {currentTab === 0 ? (
                    <>
                        <Button
                            onClick={handleModalOpen}
                            startIcon={<AddIcon />}
                            sx={{ mb: 2 }}
                            style={{
                                border: "1px solid #8bc34a",
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: "#8bc34a",
                                color: "white",
                            }}>
                            Create Course
                        </Button>
                        <Grid2 container spacing={3}>
                            {courses.map((course) => (
                                <Grid2 item xs={12} sm={6} md={4} key={course.id}>
                                    <Tooltip title={course.description} arrow>
                                        <Card
                                            sx={{
                                                minHeight: 180,
                                                minWidth: 300,
                                                transition: '0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-5px)',
                                                    boxShadow: 3,
                                                },
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleAssignmentModalOpen(course)}
                                        >
                                            <CardContent>
                                                <Box display="flex" alignItems="center" mb={2}>
                                                    <SchoolOutlined
                                                        sx={{ mr: 1 }}
                                                        style={{
                                                            color: "#D02031"
                                                        }} />
                                                    <Typography variant="h6" component="div" color='text.primary'>
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
                    </>
                ) : (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <FormControl sx={{ minWidth: 200, mr: 2 }}>
                                <InputLabel>Filter by Course</InputLabel>
                                <Select
                                    label="Filter by Course"
                                    value=""
                                    onChange={(e) => {
                                        const courseId = e.target.value;
                                        if (courseId) {
                                            const selected = courses.find(c => c.id === courseId) || null;
                                            setSelectedCourse(selected);
                                        }

                                    }}
                                >
                                    <MenuItem value="">All Courses</MenuItem>
                                    {courses.map((course) => (
                                        <MenuItem key={course.id} value={course.id}>
                                            {course.code} - {course.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Grid2 container spacing={3}>
                            {assignments.filter(assignment => !selectedCourse || assignment.courseId === selectedCourse.id).map((assignment) => (
                                <Grid2 item xs={12} sm={6} md={4} key={assignment.id}>
                                    <Card sx={{ minHeight: 180 }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {assignment.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {courses.find(c => c.id === assignment.courseId)?.code}
                                            </Typography>
                                            <Typography variant="body2">
                                                {assignment.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                Deadline: {assignment.deadline.format('YYYY-MM-DD HH:mm')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </>
                )}
            </Main>
        </Box >
    );
}