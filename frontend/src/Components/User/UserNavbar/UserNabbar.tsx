/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { removeUserInfo } from '../../../Redux/user/userInfoSlicer';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const user=useSelector((state:any)=>state?.userInfo)
    const username= user?.userName

    const homeclicks = () => {
        toggleMenu()
        navigate('/')
    };



    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

   
    const toggleProfile = (event: any) => {
        setIsProfileOpen(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(null);
    };

    const logOut = () => {
        dispatch(removeUserInfo())
        navigate('/userlogin')

    }

    return (
        <div style={{ marginBottom: '4rem' }}>
            <AppBar position="static" sx={{ background: '#867070' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1 }}></div>

                    <Box sx={{ marginRight: '10px', fontWeight: 'bold' }}>
                        <Typography>{username}</Typography>
                    </Box>

                    <Box onClick={toggleProfile}>
                        <Avatar alt="Profile Image" src="" onClick={toggleProfile} style={{ cursor: 'pointer' }} />
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
                <List style={{ padding: '16px' }}>
                    <ListItem button onClick={homeclicks}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button onClick={toggleMenu}>
                        <ListItemIcon>
                            <AssignmentIcon />

                        </ListItemIcon>
                        <ListItemText primary="Bookings"
                            onClick={() => navigate('/userallbookings')} />
                    </ListItem>
                   
                    <ListItem button onClick={toggleMenu}>
                        <ListItemIcon>
                            <ExitToAppIcon />

                        </ListItemIcon>
                        <ListItemText primary="Log out"
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
                <MenuItem onClick={logOut}>Log out</MenuItem>
            </Menu>
        </div>
    );
};

export default Header;
