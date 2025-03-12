import axios from 'axios';
import React, { useContext } from 'react'
import { AuthContext } from '../../../utils/AuthContext';

function WriteMessage() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId,
        patient, setPatient,
        admin, setAdmin
    } = useContext(AuthContext);

    const formatDate = (date) => {
        return date.toLocaleDateString("en-GB");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const today = new Date();
        const formattedDate = formatDate(today).replace(/\//g, "-");
        const data = {
            message: formData.get("message"),
            sender: admin,
            reciever: patient,
            date: formattedDate
        }
        axios.post(`${url}/admin/message`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage(response.data)
            }
        }).catch((e) => {
            if (e.response && e.response.data && e.response.data.error) {
                setError(true)
                setErrorType("error")
                setErrorMessage(e.response.data.error);
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
        <div className='bg-secondary min-h-[100vh] flex flex-col justify-center items-center gap-10'>
            <div className='bg-primary text-pink-100  w-[70%]'>
                <form onSubmit={handleSubmit} className='p-5 rounded-xl border-2 border-pink-100 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold text-2xl text-center' htmlFor="mriScan">Write your Message</label>
                        <input
                            type="text"
                            name="message"
                            placeholder='message here'
                            className='bg-secondary rounded-xl px-5 py-4 border-1 border-pink-100'
                        />
                    </div>
                    <button className='border-2 border-pink-100 w-full font-bold text-2xl rounded-xl py-3 bg-secondary'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default WriteMessage