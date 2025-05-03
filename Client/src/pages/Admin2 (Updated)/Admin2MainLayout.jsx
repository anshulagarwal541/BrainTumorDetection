import React, { useContext } from 'react'

import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext';
import Admin2Dashboard from './Admin2Dashboard';

function Admin2MainLayout() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
    } = useContext(AuthContext);

    return (
        <AuthContext.Provider
            value={{
                url,
                error, setError,
                errorType, setErrorType,
                errorMessage, setErrorMessage
            }}
        >
            <Admin2Dashboard>
                <Outlet />
            </Admin2Dashboard>
        </AuthContext.Provider>
    )
}

export default Admin2MainLayout