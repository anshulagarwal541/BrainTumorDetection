import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function PasswordChange() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage,
        user, setUser,
        admin, setAdmin
    } = useContext(AuthContext);
    const [password, setPassword] = useState(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password != null) {
            if (password.password != null && password["re-enter-password"] != null) {
                if (password.password == password["re-enter-password"]) {
                    setLoading(true)
                    const data = user;
                    data.userInfo.user.password = password.password
                    axios.post(`${url}/user/changePassword`, data, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("userAccessToken")}`
                        }
                    }).then((response) => {
                        setLoading(false)
                        if (!response.data.error) {
                            setError(true)
                            setErrorType("success")
                            setErrorMessage("Please login again..!!");
                            sessionStorage.removeItem("adminAccessToken");
                            sessionStorage.removeItem("userAccessToken");
                            navigate("/login/user")
                        }
                    }).catch((e) => {
                        setLoading(false)
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
                }
                else {
                    setError(true)
                    setErrorType("error")
                    setErrorMessage("Passwords doesn't match please re-enter..!!!")
                }
            }
            else {
                setError(true)
                setErrorType("error")
                setErrorMessage("Please enter both passwords")
            }
        }
        else {
            setError(true)
            setErrorType("error")
            setErrorMessage("Please enter password")
        }
        e.target.reset();
    };

    return (
        <div className="bg-secondary min-h-screen flex flex-col justify-center items-center px-5 py-10">
            <div className="flex flex-col sm:flex-row w-full sm:w-[80%] gap-5">

                <form
                    onSubmit={handleLogin}
                    className="bg-primary text-pink-100 w-full p-6 sm:p-8 rounded-2xl border-2 border-pink-100 flex flex-col gap-5"
                >
                    <div className="bg-secondary text-pink-100 text-xl sm:text-2xl font-bold border-2 border-pink-100 rounded-2xl text-center px-5 py-2">
                        Update Auth Credentials
                    </div>

                    {["Password", "Re-enter-Password"].map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label htmlFor={field.toLowerCase()} className="font-bold text-sm sm:text-base">
                                {field} :
                            </label>
                            <input
                                type="password"
                                id={field.toLowerCase()}
                                value={password && password[field.toLowerCase()]}
                                onChange={(e) => setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                name={field.toLowerCase()}
                                placeholder={`Enter your ${field.toLowerCase()}`}
                                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
                            />
                        </div>
                    ))}
                    <button className="px-4 py-2 w-full text-pink-100 bg-secondary border-2 border-pink-100 font-bold rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300">
                        {
                            loading ? (
                                <>
                                    <CircularProgress color="secondary" />
                                </>
                            ) : "Update Password"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordChange;
