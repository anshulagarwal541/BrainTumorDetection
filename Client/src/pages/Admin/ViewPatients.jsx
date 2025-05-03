import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function ViewPatients() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        doctor
    } = useContext(AuthContext);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        if (doctor) {
            axios.get(`${url}/doctor/${doctor.userInfo.id}/allPatients`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("doctorAccessToken")}`
                }
            }).then((response) => {
                if (!response.data.error) {
                    console.log(response.data)
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
    }, [doctor])

    const InitializeRows = (patients) => {
        const p = patients.map(patient => {
            return {
                id: patient.id,
                email: patient.userInfo.user.email,
                name: patient.userInfo.name,
                age: patient.userInfo.age,
                phone: patient.userInfo.phone,
                statusId: patient.id,
                status: patient.status
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
            field: 'status',
            headerName: 'status',
            width: 150,
            headerAlign: 'center',
            align: 'center'
        },
        {
            width: 150,
            renderCell: (param) => {
                return (
                    <Link key={param.row.id} to={`/doctor/user/${param.row.statusId}`}>
                        <button className='bg-pink-700 px-5 h-fit rounded-full text-sm'>
                            <RemoveRedEyeIcon />
                        </button>
                    </Link>
                )
            }
        }
    ];

    return (
        <div className='min-h-[100vh] bg-secondary text-pink-100 flex flex-col gap-5 justify-center items-center'>
            <div className='text-2xl font-bold text-pink-100 border-2 border-pink-100 px-5 py-2 rounded-xl'>
                Patients
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
                                color: '#582040', // ✅ Keep header text light
                            },

                            // ✅ Centering Table Content
                            '& .MuiDataGrid-cell': {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fce7f3', // ✅ Ensure text is visible
                            }
                        }}
                    />

                </Box>
            </div>
        </div>
    )
}

export default ViewPatients