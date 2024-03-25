import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("microUser")) {
            navigate("/search");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        const id = toast.loading("Please wait...");
        axios
            .post("http://localhost:4000/api/auth/signin", {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.data.success) {
                    toast.dismiss(id);
                    toast.success("Logged in");
                    localStorage.setItem("microUser", JSON.stringify(res.data.user));
                    navigate("/search");
                    window.location.reload();
                } else {
                    toast.dismiss(id);
                    toast.error("Some internal error occurred, contact admin");
                }
            })
            .catch((err) => {
                toast.dismiss(id);
                toast.error("Some internal error occurred, contact admin");
            });
    }

    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800 h-[100%]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email} // Bind value to state variable
                                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password} // Bind value to state variable
                                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="#" onClick={() => navigate("/signup")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Create Account
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
