import React, { useRef, useState } from 'react'
import axios from 'axios';
import { Alert } from '@mui/material';
const ForgotPassword = () => {
    const emailRef = useRef(null);
    const [severity, setSeverity] = useState('');
    const [resMsg, setResMsg] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let obj = {
                email: emailRef.current.value
            }


            const response = await axios.post('http://localhost:3006/users/forgotPassword', obj);
            console.log(response);
            emailRef.current.value = "";
            setSeverity('success');
            setResMsg(response.data.msg);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 5000)

        } catch (error) {
            console.log(error);
            setSeverity('warning');
            setResMsg(error.response.data.msg);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 5000)
        }
    }
    return (
        <div>
            <div className=" border border-black max-w-lg mx-auto my-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
                {openAlert && <Alert severity={severity}>{resMsg}</Alert>}
                <h1 className="text-4xl mt-3 font-medium">Reset password</h1>
                <p className="text-slate-500">Fill up the form to reset the password</p>
                <form className="my-10" onSubmit={formSubmitHandler}>
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="email">
                            <p className="font-medium text-slate-700 pb-2">Email address</p>
                            <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" ref={emailRef} />
                        </label>
                        <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                            <span>Reset password</span>
                        </button>
                        <p className="text-center">Not registered yet? <a href="/" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span></a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword