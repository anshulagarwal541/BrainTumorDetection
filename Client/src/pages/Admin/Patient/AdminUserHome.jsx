import React, { useContext } from 'react';
import { hero_image4 } from '../../../../public';
import { AuthContext } from '../../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';

function AdminUserHome() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId,
        patient, setPatient
    } = useContext(AuthContext)

    const handleClose = () => {
        setError(false);
        setErrorMessage(null);
        setErrorType(null);
    };

    return (
        <div className='min-h-[100vh] bg-secondary'>
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
            <div
                style={{
                    backgroundImage: `url(${hero_image4})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
                className='relative h-[100vh]'
            >
                <div className='absolute top-0 backdrop-brightness-[15%] text-extend-secondary flex justify-center items-center h-full w-full'>
                    <div className='h-fit w-fit flex flex-col gap-9 justify-center items-center text-pink-400 text-5xl font-bold px-4'>
                        {/* Heading */}
                        <p className='text-pink-100 bg-primary px-5 py-3 rounded-full text-center'>
                            Patient Section
                        </p>

                        {/* Description */}
                        <p className='text-center text-2xl font-extrabold w-full sm:w-[80%] md:w-[70%] lg:w-[60%]'>
                            {patient && patient.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUserHome;
