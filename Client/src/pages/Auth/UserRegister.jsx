import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function UserRegister() {
    const {
        url,
        error, setError,
        errorType, setErrorType,
        errorMessage, setErrorMessage
    } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target);
        const data = {
            name: formData.get("name"),
            age: formData.get("age"),
            phone: formData.get("phone"),
            user: {
                email: formData.get("email"),
                password: formData.get("password")
            }
        };
        axios.post(`${url}/register/user`, data).then((response) => {
            setLoading(false)
            if (!response.data.error) {
                sessionStorage.setItem("userAccessToken", response.data);
                setError(true)
                setErrorType("success")
                setErrorMessage("Successfully logged in as USER..!!");
                navigate("/user");
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
        e.target.reset();
    };

    const handleClose = () => {
        setError(false);
        setErrorMessage(null);
        setErrorType(null);
    };

    return (
        <div className="bg-secondary min-h-screen flex flex-col justify-center items-center px-5 py-10">
            <div className="flex flex-col sm:flex-row w-full sm:w-[80%] gap-5">
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
                <form
                    onSubmit={handleLogin}
                    className="bg-primary text-pink-100 w-full p-6 sm:p-8 rounded-2xl border-2 border-pink-100 flex flex-col gap-5"
                >
                    <div className="bg-secondary text-pink-100 text-xl sm:text-2xl font-bold border-2 border-pink-100 rounded-2xl text-center px-5 py-2">
                        User Registration
                    </div>

                    {["Name", "Phone", "Age", "Email", "Password"].map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <label htmlFor={field.toLowerCase()} className="font-bold text-sm sm:text-base">
                                {field} :
                            </label>
                            <input
                                type={field === "Password" ? "password" : (field === "Phone" ? "number" : "text")}
                                id={field.toLowerCase()}
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
                            ) : "Sign Up"
                        }
                    </button>

                    <div className="flex flex-col gap-3">
                        {[
                            { label: "Login as Admin ?", path: "/login/admin" },
                            { label: "Login as User ?", path: "/login/user" }
                        ].map((link, index) => (
                            <p key={index} className="font-bold flex justify-between items-center">
                                {link.label}
                                <Link to={link.path}>
                                    <button className="px-4 py-2 w-fit text-pink-100 bg-secondary border-2 border-pink-100 font-bold hover:bg-primary hover:text-secondary transition-all duration-300">
                                        Login
                                    </button>
                                </Link>
                            </p>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;
