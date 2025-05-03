import React, { useContext, useState } from 'react';
import { add_patient } from '../../../public';
import { AuthContext } from '../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function Add2Doctor() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
    } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            age: formData.get("age"),
            phone: formData.get("phone"),
            user: {
                email: formData.get("email"),
                password: "doctor",
                roles: ["DOCTOR"]
            }
        }
        axios.post(`${url}/admin/addDoctor`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            setLoading(false)
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage(response.data)
            }
        }).catch((e) => {
            setLoading(false)
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
        e.target.reset();
    }

    return (
        <div className="bg-secondary min-h-[100vh] text-white flex flex-col justify-center items-center px-5 gap-10">
            <div className='bg-primary text-pink-100 text-2xl font-bold border-2 border-pink-100 rounded-2xl text-center px-5 py-2'>
                Add Doctor Details
            </div>
            <div className='flex flex-col sm:flex-row w-full sm:w-[80%] gap-2'>
                {/* Image Section */}
                <div className='flex justify-center items-center sm:w-1/2'>
                    <div className='h-fit sm:h-full'>
                        <img src={add_patient} alt="add_patient" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>

                {/* Form Section */}
                <div className='flex w-full sm:w-1/2'>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-primary text-pink-100 w-full p-5 sm:p-8 rounded-2xl border-2 border-pink-100 gap-5 flex flex-col"
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-bold text-sm sm:text-base">
                                Doctor's Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="font-bold text-sm sm:text-base">
                                Doctor's Phone No:
                            </label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                placeholder="Enter phone number"
                                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="font-bold text-sm sm:text-base">
                                Doctor's Age:
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="Enter age"
                                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="age" className="font-bold text-sm sm:text-base">
                                Doctor's Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
                            />
                        </div>
                        <button className="px-4 py-2 w-full text-pink-100 bg-secondary border-2 border-pink-100 font-bold rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300">
                            {
                                loading ? (
                                    <>
                                        <CircularProgress color="secondary" />
                                    </>
                                ) : "Submit"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add2Doctor;
