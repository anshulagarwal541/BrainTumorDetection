import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'
import UserDashboard from './UserDashboard';

function UserMainLayout() {
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
            <UserDashboard>
                <Outlet />
            </UserDashboard>
        </AuthContext.Provider>
    )
}

export default UserMainLayout