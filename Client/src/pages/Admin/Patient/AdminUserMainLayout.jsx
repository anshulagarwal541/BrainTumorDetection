import React, { useContext } from 'react'
import { AuthContext } from '../../../utils/AuthContext'
import AdminUserDashboard from './AdminUserDashboard';
import { Outlet, useParams } from 'react-router-dom';

function AdminUserMainLayout() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
    } = useContext(AuthContext);
    const {statusId} = useParams();

    return (
        <AuthContext.Provider
            value={{
                url,
                error, setError,
                errorType, setErrorType,
                errorMessage, setErrorMessage,
                statusId
            }}
        >
            <AdminUserDashboard>
                <Outlet />
            </AdminUserDashboard>
        </AuthContext.Provider>
    )
}

export default AdminUserMainLayout