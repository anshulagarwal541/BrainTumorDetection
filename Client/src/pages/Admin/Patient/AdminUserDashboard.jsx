import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import AdminUserNavbar from './AdminUserNavBar';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

function AdminUserDashboard({ children }) {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId
    } = useContext(AuthContext);
    const [patient, setPatient] = useState(null);
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        axios.get(`${url}/admin/getUser/${statusId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setPatient(response.data);
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

        axios.get(`${url}/admin`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
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
                statusId,
                patient, setPatient,
                admin, setAdmin
            }}
        >
            <div>
                <AdminUserNavbar />
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

export default AdminUserDashboard