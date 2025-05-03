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
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const { url } = useContext(AuthContext);
  const [state, setState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  useEffect(() => {
    const adminToken = sessionStorage.getItem('adminAccessToken');
    const userToken = sessionStorage.getItem('userAccessToken')
    const doctorToken = sessionStorage.getItem('doctorAccessToken')
    if (adminToken == null && userToken == null && doctorToken == null) {
      setIsAdmin(false)
      setIsUser(false)
      setIsDoctor(false);
    }
    else {
      if (adminToken != null) {
        setIsAdmin(true)
      }
      else if (userToken != null) {
        setIsUser(true)
      }
      else if (doctorToken != null) {
        setIsDoctor(true)
      }
    }
    if (sessionStorage.getItem("adminAccessToken") != null) {
      setIsAdmin(true);
    }
    if (sessionStorage.getItem("userAccessToken") != null) {
      setIsUser(true);
    }
    if (sessionStorage.getItem("doctorAccessToken") != null) {
      setIsDoctor(true);
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
        {isDoctor && (
          <>
            {['Home', 'Add Patient', 'View Patients'].map((text, index) => (
              <Link
                key={index}
                to={`${text == 'Add Patient' ? '/doctor/addPatient' : (
                    text == "Downloads" ? '/doctor/downloads' : (
                      text == 'Home' ? '/doctor' : (
                        text == 'View Patients' ? '/doctor/viewPatients' : ''
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
          </>
        )}
        {isUser && (
          <>
            {['Home', 'Update Details', 'View Scans', 'Generate Report', 'Chat', 'Change Password'].map((text, index) => (
              <Link
                key={index}
                to={`${text == 'Update Details' ? '/user/update/details' : (
                  text == 'Generate Report' ? '/user/generateReport' : (
                    text == "Downloads" ? '/admin/downloads' : (
                      text == 'Home' ? '/user' : (
                        text == 'View Scans' ? '/user/reports' : (
                          text == 'Chat' ? "/user/chats" : (
                            text == 'Change Password' ? "/user/changePassword" : ""
                          )
                        )
                      ))))}`} >
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
          </>
        )}
        {isAdmin && (
          <>
            {['Home', 'Add Doctor', 'View Patients', 'View Doctors'].map((text, index) => (
              <Link
                key={index}
                to={`${text == 'Add Doctor' ? '/admin/addDoctor' : (
                    text == "Downloads" ? '/admin/downloads' : (
                      text == 'Home' ? '/admin' : (
                        text == 'View Patients' ? '/admin/viewPatients' : (
                          text == 'View Doctors' ? '/admin/viewDoctors' : ""
                        ))))}`} >
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
          </>
        )}
      </List>
      <Divider sx={{ backgroundColor: 'white' }} />
      <div className='font-bold py-2 min-w-full'>
        {(isAdmin || isUser || isDoctor) ? (
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

export default NavBar;
