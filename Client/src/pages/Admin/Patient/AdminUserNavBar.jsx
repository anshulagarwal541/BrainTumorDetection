import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../utils/AuthContext';

function AdminUserNavbar() {
    const navigate = useNavigate();
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId,
        patient, setPatient
    } = useContext(AuthContext);
    const [state, setState] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        const adminToken = sessionStorage.getItem('adminAccessToken');
        const userToken = sessionStorage.getItem('userAccessToken')
        if (adminToken == null && userToken == null) {
            setIsAdmin(false)
            setIsUser(false)
        }
        else {
            if (adminToken != null) {
                setIsAdmin(true)
            }
            else {
                setIsUser(true)
            }
        }
        if (sessionStorage.getItem("adminAccessToken") != null) {
            setIsAdmin(true);
        }
        if (sessionStorage.getItem("userAccessToken") != null) {
            setIsUser(true);
        }
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };

    const handleLogOut = () => {
        sessionStorage.removeItem("adminAccessToken");
        sessionStorage.removeItem("userAccessToken");
        navigate('/login/user');
    }

    const list = (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{
                backgroundColor: '#582040',
                color: 'white',
                padding: '5px'
            }}
        >
            <List
            >
                {['Patient Home', 'All Reports', 'Generate Report', "Chat", "Main Page"].map((text, index) => (
                    <Link
                        key={index}
                        to={`${text == 'Generate Report' ? `/admin/user/${statusId}/generateReport` : (
                            text == "Downloads" ? '/admin/downloads' : (
                                text == 'Patient Home' ? `/admin/user/${statusId}` : (
                                    text == 'All Reports' ? `/admin/user/${statusId}/reports` : (
                                        text == "Chat" ? `/admin/user/${statusId}/queries` : (
                                            text == "Main Page" ? '/admin' : ""
                                        )
                                    )
                                )))}`} >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon sx={{ color: 'white' }} /> : <MailIcon sx={{ color: 'white' }} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider sx={{ backgroundColor: 'white' }} />
            <div className='font-bold py-2 min-w-full'>
                {(isAdmin || isUser) ? (
                    <button onClick={handleLogOut} className='border-2 border-pink-100 px-5 py-2 w-full bg-secondary text-pink-100'>
                        logout
                    </button>
                ) : (
                    <Link to="/login/user">
                        <button className='border-2 border-pink-100 px-5 py-2 w-full bg-secondary text-pink-100'>
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </Box>
    );

    return (
        <div className="bg-primary text-white px-5 py-3 border-b-2 border-b-extend-white">
            <div>
                <Button
                    onClick={toggleDrawer(true)}
                    sx={{ color: 'white' }}
                ><MenuIcon /></Button>
                <Drawer
                    anchor="top"
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    {list}
                </Drawer>
            </div>
        </div>
    );
}

export default AdminUserNavbar;
