// import React, { useContext } from 'react'
// import ChatBox from './ChatBox'
// import SearchIcon from '@mui/icons-material/Search';
// import { AuthContext } from '../../../utils/AuthContext';

// function PatientChat() {
//     const {
//         url,
//         error, setError,
//         errorType, setErrorType,
//         errorMessage, setErrorMessage,
//         statusId,
//         patient, setPatient,
//         admin, setAdmin
//     } = useContext(AuthContext);

//     return (
//         <div className='bg-pink-100 min-h-[100vh] text-primary flex flex-col'>
//             <div className='border-b-2 border-b-primary'>
//                 <div className='text-center text-2xl font-extrabold p-4'>
//                     {patient && patient.name}
//                 </div>
//             </div>
//             <div class="overflow-y-scroll min-h-[200px] border-b-2 border-b-primary">

//             </div>
//             <div className='flex justify-center items-center gap-2'>
//                 <form onSubmit={postMessage}>
//                     <input
//                     className='bg-primary px-5 py-2 text-pink-100 rounded-2xl'
//                         placeholder='Enter your message here'
//                         type="text"
//                     />
//                     <button className='bg-primary px-5 py-2 rounded-2xl text-bold text-pink-100 font-bold'>Send</button>
//                 </form>
//             </div>
//         </div>
//         // <div className='bg-secondary min-h-[100vh] flex flex-col justify-center items-center gap-10'>
//         //     <div className='text-2xl font-bold text-pink-100 border-2 border-pink-100 px-5 py-2 rounded-xl'>
//         //         Messages
//         //     </div>
//         //     <div className='text-2xl font-bold text-pink-100 border-2 border-pink-100 px-5 py-2 rounded-xl'>
//         //         <form
//         //             className='flex items-center justify-center gap-5'
//         //             onSubmit={handleSubmit}
//         //         >
//         //             <input
//         //                 type="text"
//         //                 className='bg-transparent flex justify-center items-center'
//         //                 placeholder='Enter date ex: dd-mm-yyyy'
//         //                 name="date"
//         //             />
//         //             <button type="submit" className='flex bg-primary rounded-full p-2 justify-center items-center font-extrabold'>
//         //                 <SearchIcon sx={{ fontWeight: 800, color:"#fce7f3" }} />
//         //             </button>
//         //         </form>
//         //     </div>
//         //     <ChatBox />
//         // </div>
//     )
// }

// export default PatientChat



import React, { useContext, useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from '../../../utils/AuthContext';
import axios from 'axios';

function PatientChat() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        statusId,
        patient, setPatient,
        admin, setAdmin
    } = useContext(AuthContext);

    useEffect(() => {
        if (patient) {
            axios.get(`${url}/admin/${patient.user.id}/messages`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
                }
            }).then((response) => {
                if (!response.data.error) {
                    setMessages(response.data)
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

    const [messages, setMessages] = useState([]);

    const formattedDate = new Date().toISOString();

    const postMessage = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const today = new Date();
        const data = {
            sender: admin,
            reciever: patient.user,
            message: formData.get("message").trim(),
            dateTime: formattedDate
        };
        axios.post(`${url}/admin/${patient.user.id}/message`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setMessages(response.data)
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
    };

    return (
        <div className='bg-pink-100 min-h-[100vh] text-primary flex flex-col'>
            <div className='border-b-2 border-b-primary p-4 text-center text-2xl font-extrabold'>
                {patient && patient.name}
            </div>

            <div className="flex flex-col flex-grow overflow-y-auto px-4 py-4 space-y-3">
                {patient && admin && messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender.id === admin.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-xl ${msg.sender.id === admin.id ? 'bg-primary text-pink-100' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>


            <div className='p-4 border-t-2 border-t-primary'>
                <form onSubmit={postMessage} className='flex items-center gap-2'>
                    <input
                        className='bg-primary px-5 py-2 text-pink-100 rounded-2xl flex-grow'
                        placeholder='Enter your message here'
                        type="text"
                        name="message"
                    />
                    <button type="submit" className='bg-primary px-5 py-2 rounded-2xl text-bold text-pink-100 font-bold'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PatientChat;
