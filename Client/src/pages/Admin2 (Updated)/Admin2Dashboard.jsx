import React, { useContext } from 'react'
import NavBar from '../../components/NavBar';
import { AuthContext } from '../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';

function Admin2Dashboard({ children }) {
  const {
    url,
    error, setError,
    errorType, setErrorType,
    errorMessage, setErrorMessage
  } = useContext(AuthContext);

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
        errorMessage, setErrorMessage
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

export default Admin2Dashboard