import React, { useContext } from 'react'
import AdminDashboard from './AdminDashboard'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'

function AdminMainLayout() {
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
            <AdminDashboard>
                <Outlet />
            </AdminDashboard>
        </AuthContext.Provider>
    )
}

export default AdminMainLayout