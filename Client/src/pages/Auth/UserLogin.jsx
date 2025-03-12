import React, { useContext, useState } from 'react'
import { user_login } from '../../../public'
import { Link } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../utils/AuthContext'

function UserLogin() {
  const {
    url,
    error, setError,
    errorType, setErrorType,
    errorMessage, setErrorMessage
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    axios.post(`${url}/login/user`, data).then((response) => {
      if (!response.data.error) {
        sessionStorage.setItem("userAccessToken", response.data);
        setError(true)
        setErrorType("success")
        setErrorMessage("Successfully logged in ad USER..!!");
        navigate("/user");
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

  const handleClose = () => {
    setError(false);
    setErrorMessage(null);
    setErrorType(null);
  };

  return (
    <div className="bg-secondary min-h-[100vh] text-white flex flex-col justify-center items-center px-5 gap-10">
      <div className='flex flex-col sm:flex-row w-full sm:w-[80%] gap-2'>

        <div className='flex justify-center items-center sm:w-1/2'>
          <div className='h-fit sm:h-full'>
            <img src={user_login} alt="add_patient" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>


        <div className='flex w-full sm:w-1/2'>
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
            action="post"
            className="bg-primary text-pink-100 w-full p-5 sm:p-8 rounded-2xl border-2 border-pink-100 gap-5 flex flex-col"
          >
            <div className='bg-secondary text-pink-100 text-2xl font-bold border-2 border-pink-100 rounded-2xl text-center px-5 py-2'>
              User Login
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-sm sm:text-base">
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ex. @example.com"
                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-sm sm:text-base">
                Password :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="ex. 123"
                className="border-2 border-secondary px-4 py-2 rounded-full text-primary text-sm sm:text-base"
              />
            </div>
            <button className="px-4 py-2 w-full text-pink-100 bg-secondary border-2 border-pink-100 font-bold rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300">
              Login
            </button>
            <div className="flex flex-col gap-2">
              <p className='font-bold flex gap-5 items-center justify-between'>Login as Admin ?
                <Link to="/login/admin">
                  <button className="px-4 py-2 w-fit text-pink-100 bg-secondary border-2 border-pink-100 font-bold hover:bg-primary hover:text-secondary transition-all duration-300">
                    Login
                  </button>
                </Link>
              </p>
              <p className='font-bold flex gap-5 items-center justify-between'>Register as User ?
                <Link to="/register/user">
                  <button className="px-4 py-2 w-fit text-pink-100 bg-secondary border-2 border-pink-100 font-bold hover:bg-primary hover:text-secondary transition-all duration-300">
                    SignUp
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserLogin