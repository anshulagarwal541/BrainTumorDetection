import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function View2Patients() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
    } = useContext(AuthContext);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/admin/allPatients`, {
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
        axios.get(`${url}/admin/allDoctors`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setDoctors(response.data)
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

    const InitializeRows = (patients) => {
        const p = patients.map(patient => {
            return {
                id: patient.id,
                email: patient.userInfo.user.email,
                name: patient.userInfo.name,
                age: patient.userInfo.age,
                phone: patient.userInfo.phone,
                statusId: patient.id,
                doctor: patient.doctor ? patient.doctor.name : null
            }
        })
        setPatients(p);
    }

    const assignPatientDoctor = (doctorId, patientId) => {
        axios.get(`${url}/admin/${doctorId}/assign/patient/${patientId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage(response.data);
                navigate(0);
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
            headerName: 'Assigned Doctor',
            width: 150,
            renderCell: (param) => {
                return (
                    param.row.doctor ? (
                        <div className='py-0.5 bg-secondary text-pink-100 px-1.5 text-sm rounded-full'>
                            {param.row.doctor}
                        </div>
                    ) : (
                        <select
                            onChange={(e) => {
                                if (e.target.value != "-1") {
                                    assignPatientDoctor(e.target.value, param.row.id)
                                }
                            }}
                            name=""
                            id=""
                            className='py-0.5 bg-secondary text-pink-100 px-1.5 text-sm rounded-full'
                        >
                            <option value="-1">none</option>
                            {doctors && doctors.map((doctor) => {
                                return (
                                    <option value={doctor.id}>{doctor.userInfo.name}</option>
                                )
                            })}
                        </select>
                    )
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

export default View2Patients