import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { AuthContext } from '../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';

function UserDashboard({ children }) {
  const {
    url,
    error, setError,
    errorType, setErrorType,
    errorMessage, setErrorMessage
  } = useContext(AuthContext);
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    axios.get(`${url}/user`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userAccessToken")}`
      }
    }).then((response) => {
      if (!response.data.error) {
        setUser(response.data);
      }
    }).catch((e) => {
      if (e.response && e.response.data && e.response.data.message) {
        setError(true)
        setErrorType("error")
        setErrorMessage(e.response.data.message);
      }
      else if (e.response && e.response.data) {
        setError(true)
        setErrorType("error")
        setErrorMessage(e.response.data);
      }
    })

    axios.get(`${url}/user/getDoctor`, {
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem("userAccessToken")}`
      }
    }).then((response) => {
      if (!response.data.error) {
        setAdmin(response.data);
      }
    }).catch((e) => {
      if (e.response && e.response.data && e.response.data.message) {
        setError(true)
        setErrorType("error")
        setErrorMessage(e.response.data.message);
      }
      else if (e.response && e.response.data) {
        setError(true)
        setErrorType("error")
        setErrorMessage(e.response.data);
      }
    })
  }, [])

  const handleClose = () => {
    setError(false);
    setErrorMessage(null);
    setErrorType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        user, setUser,
        admin, setAdmin
      }}
    >
      <div>
        <NavBar />
        <div className='min-h-lvh'>
          {error && (
            <div>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={error}
                autoHideDuration={3000}
              >
                <Alert
                  onClose={handleClose}
                  severity={errorType}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </div>
          )}
          {children}
        </div>
      </div>
    </AuthContext.Provider>
  )
}

export default UserDashboard;