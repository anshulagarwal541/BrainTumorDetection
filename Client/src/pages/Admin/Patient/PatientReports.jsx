import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AuthContext } from '../../../utils/AuthContext';
import PreviewIcon from '@mui/icons-material/Preview';

function PatientReports() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId,
        patient, setPatient,
        admin, setAdmin
    } = useContext(AuthContext);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        if (patient != null) {
            axios.get(`${url}/admin/${patient.id}/scans`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
                }
            }).then((response) => {
                if (!response.data.error) {
                    InitializeRows(response.data);
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
        }
    }, [patient])

    const InitializeRows = (mriScans) => {
        const p = mriScans.map(scan => {
            return {
                id: scan.userInfo.user.id,
                email: scan.userInfo.user.email,
                name: scan.userInfo.name,
                age: scan.userInfo.age,
                phone: scan.userInfo.phone,
                fileName: scan.name,
                url: scan.url
            }
        })
        setPatients(p);
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'fileName',
            headerName: 'File Name',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            width: 150,
            headerName: 'View Scan',
            headerAlign: 'center',
            align: 'center',
            renderCell: (param) => {
                return (
                    <Link to={`${param.row.url}`}>
                        <button className='bg-pink-700 px-5 h-fit rounded-full text-sm'>
                            <PreviewIcon />
                        </button>
                    </Link>
                )
            }
        }
    ];

    return (
        <div className='min-h-[100vh] bg-secondary text-pink-100 flex flex-col gap-5 justify-center items-center'>
            <div className='text-2xl font-bold text-pink-100 border-2 border-pink-100 px-5 py-2 rounded-xl'>
                Patient's MRI Scans
            </div>
            <div className='w-[80%] rounded-2xl'>
                <Box sx={{ height: 400, width: '100%', color: '#fce7f3', backgroundColor: '#582040', borderRadius: '5px' }}>
                    <DataGrid
                        rows={patients}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableCheckboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            borderRadius: '5px',
                            backgroundColor: '#582040',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 'bold',
                                color: '#582040',
                            },
                            '& .MuiDataGrid-cell': {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fce7f3',
                            }
                        }}
                    />

                </Box>
            </div>
        </div>
    )
}

export default PatientReports