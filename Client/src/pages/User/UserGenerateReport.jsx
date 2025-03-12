import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../utils/AuthContext';

function UserGnerateReports() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        user, setUser,
        admin, setAdmin
    } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setError(true)
            setErrorType("error")
            setErrorMessage("Please select an image before uploading.");
            return;
        }
        setLoading(true);
        setMessage('');

        const formData = new FormData(e.target);
        const data = {
            name: selectedFile.name,
            file: selectedFile
        }
        axios.post(`${url}/user/${user.id}/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("userAccessToken")}`
            }
        }
        ).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage("Successfully uploaded image..!!");
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
        e.target.reset();
        setLoading(false);
    };

    return (
        <div className='bg-secondary min-h-[100vh] flex flex-col justify-center items-center gap-10'>
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold text-pink-200 text-xl'>To Know :-</p>
                <p className='text-pink-100 text-center text-sm w-[80%]'>
                    Brain tumors disrupt brain function and increase pressure, requiring accurate detection and localization for better outcomes.
                    MRI is the primary diagnostic tool, but manual segmentation is labor-intensive and inconsistent.
                    Machine-operated segmentation addresses these issues with precision and reliability.
                    Advances in deep learning, particularly architectures like U-Net, have revolutionized brain tumor segmentation by extracting hierarchical features effectively.
                    These methods ensure reproducible and efficient results, meeting the growing diagnostic demands.
                </p>
            </div>
            <div className='text-pink-100 font-bold text-3xl border-2 border-pink-100 rounded-xl w-fit px-5 py-2 bg-primary'>
                Report Generation
            </div>
            <div className='bg-primary text-pink-100  w-[70%]'>
                <form onSubmit={uploadFile} className='p-5 rounded-xl border-2 border-pink-100 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label className='font-bold text-2xl text-center' htmlFor="mriScan">Add MRI Scan image :</label>
                        <input name="name" type="file" onChange={handleFileChange} className='bg-secondary rounded-xl px-5 py-4 border-1 border-pink-100' />
                    </div>
                    <button type="submit" className='border-2 border-pink-100 w-full font-bold text-2xl rounded-xl py-3 bg-secondary' disabled={loading}>
                        {loading ? "Uploading..." : "Generate"}
                    </button>
                </form>
                {message && <p className='text-center mt-3 font-bold'>{message}</p>}
            </div>
        </div>
    );
}

export default UserGnerateReports;
