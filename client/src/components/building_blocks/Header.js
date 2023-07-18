import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



import { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { UserContext } from '../../context/userContext';
import { ShelfContext } from '../../context/shelfContext';
import Cookies from "js-cookie";
import { ClassNames } from '@emotion/react';

const Header = () => {
    const navigate = useNavigate()
    const { user, dispatch : userDispatch } = useContext(UserContext)
    const { shelves, dispatch : shelfDispatch } = useContext(ShelfContext)

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        (async () => {
            const res = await fetch("/logout", { method: "POST", headers: {
                "Content-Type": "application/json"
            } })
            if (res.ok) {
                userDispatch({ type: "remove" })
                shelfDispatch({ type: "reset"})
                navigate("/")
            }
        })();
    }

    return (
        <AppBar 
            // elevation={6}
            sx={{
            padding: 1,
            boxShadow: "12px 12px 12px #f7f5f5"
            }}
        position="static" 
        color="secondary">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            {/* <Box component="img" src="../orange-glasses.PNG" sx={{ maxHeight: 25, padding: "0 1em 0 0" }}></Box> */}
            <Typography
                variant="h3"
                noWrap
                component={Link}
                to="/"
                sx={{
                mr: 2,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
                }}
                alignSelf="center"
                justifyContent="center"
            >
                bookish
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.username} src={user?.profile_pic} />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                { user ? <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>My profile</MenuItem> : null }
                { user ? <MenuItem onClick={() => navigate("/shelves")}>My shelves</MenuItem> : null }
                { user ? 
                    <MenuItem 
                        onClick={() => {
                            handleLogout()
                            handleCloseUserMenu()
                            }}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem> :
                    <MenuItem 
                        onClick={() => {
                            navigate("/login")
                            handleCloseUserMenu()
                            }}>
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                }
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    )
}

export default Header