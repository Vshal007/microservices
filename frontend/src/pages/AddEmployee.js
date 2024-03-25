import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddEmployee = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);
    };

    const handleEmployeeNameChange = (e) => {
        setEmployeeName(e.target.value);
    };

    const handleOrganizationNameChange = (e) => {
        setOrganizationName(e.target.value);
    };

    const handleDepartmentIdChange = (e) => {
        setDepartmentId(e.target.value);
    };
    const handleLogout = () => {
        localStorage.removeItem('microUser');
        navigate("/");// Clear the user data from localStorage
        window.location.reload(); // Refresh the page
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = toast.loading("Please wait...");
        let error = false;

        // Validate input fields
        if (!employeeId || !employeeName || !organizationName || !departmentId) {
            setError('Please fill in all fields.');
            error = true;
        }


        if (!error) {
            axios
                .post("http://localhost:5000/api/emp/addemployee", {
                    employeeId,
                    employeeName,
                    organizationName,
                    departmentId,
                })
                .then((res) => {
                    if (res.data.success) {
                        toast.dismiss(id);
                        toast.success("Employee added successfully");
                        // Redirect to search page or any other page
                    } else {
                        toast.dismiss(id);
                        toast.error(res.data.message);
                    }
                })
                .catch((er) => {
                    toast.dismiss(id);
                    toast.error("Some internal error occurred, please try again later");
                    console.log(er);
                });
        } else {
            toast.dismiss(id);
            toast.error("Invalid Entries");
        }
    };

    return (
        <>
            <ToastContainer />
            <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-red-600 rounded-md hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                Logout
            </button>
            <button
                onClick={() => { navigate("/search") }}
                className="px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-red-600 rounded-md hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
                Search
            </button>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800 h-[100%]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
                        Add Employee
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="employeeId" className="block text-sm font-medium leading-6 text-slate-300">
                                Employee ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="employeeId"
                                    name="employeeId"
                                    type="text"
                                    autoComplete="off"
                                    value={employeeId}
                                    onChange={handleEmployeeIdChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="employeeName" className="block text-sm font-medium leading-6 text-slate-300">
                                Employee Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="employeeName"
                                    name="employeeName"
                                    type="text"
                                    autoComplete="off"
                                    value={employeeName}
                                    onChange={handleEmployeeNameChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="organizationName" className="block text-sm font-medium leading-6 text-slate-300">
                                Organization Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="organizationName"
                                    name="organizationName"
                                    type="text"
                                    autoComplete="off"
                                    value={organizationName}
                                    onChange={handleOrganizationNameChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="departmentId" className="block text-sm font-medium leading-6 text-slate-300">
                                Department ID
                            </label>
                            <div className="mt-2">
                                <input
                                    id="departmentId"
                                    name="departmentId"
                                    type="text"
                                    autoComplete="off"
                                    value={departmentId}

                                    onChange={handleDepartmentIdChange}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Employee
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="#" onClick={() => navigate("/signin")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default AddEmployee;
