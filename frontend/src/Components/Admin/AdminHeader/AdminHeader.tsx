import { useEffect, useState } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogOut } from '../../../Redux/admin/adminTokenSlice';



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getuserDetails = async () => {

    }

    const homeclicks = () => {
        toggleMenu()
        navigate('/admin')
    };

    useEffect(() => {
        getuserDetails()
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleCloseProfile = () => {
        setIsProfileOpen(null);
    };

    const logOut = () => {
     dispatch(adminLogOut())
     navigate('/adminlogin')
    }

    return (
        <div style={{ marginBottom: '4rem' }}>
            <AppBar position="static" sx={{ background: '#0B666A' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1 }}></div>

                    <Box sx={{ marginRight: '10px', fontWeight: 'bold' }}>
                        <Typography>ADMIN</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
                <List style={{ padding: '16px' }}>
                    <ListItem button onClick={homeclicks}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Bookings" />
                    </ListItem>

                    <ListItem button onClick={toggleMenu}>
                        <ListItemIcon>
                            <PeopleIcon />

                        </ListItemIcon>
                        <ListItemText primary="All Services"
                            onClick={() => navigate('/admin/services')} />
                    </ListItem>

                    <ListItem button onClick={toggleMenu}>
                        <ListItemIcon>
                            <ExitToAppIcon />

                        </ListItemIcon>
                        <ListItemText primary="Log Out"
                            onClick={logOut} />
                    </ListItem>

                </List>
            </Drawer>
            <Menu
                anchorEl={isProfileOpen}
                open={Boolean(isProfileOpen)}
                onClose={handleCloseProfile}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {/* <MenuItem onClick={handleCloseProfile}>Profile</MenuItem> */}
                <MenuItem onClick={logOut}>Log out</MenuItem>
            </Menu>
        </div>
    );
};

export default Header;
