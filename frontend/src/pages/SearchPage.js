import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function SearchPage() {

  const [employeeId, setEmployeeId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is an admin when component mounts
    const microUser = JSON.parse(localStorage.getItem('microUser'));
    if (microUser && microUser.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('microUser');
    navigate("/");// Clear the user data from localStorage
    window.location.reload(); // Refresh the page
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    axios
      .get(`http://localhost:5000/api/emp/employees/${employeeId}`)
      .then((res) => {
        if (res.data.success) {
          toast.dismiss(id);
          toast.success("Employee found");

          setEmployeeDetails(res.data.employee)
        } else {
          toast.dismiss(id);
          toast.error("Some internal error occurred, contact admin");
        }
      })
      .catch((err) => {
        toast.dismiss(id);
        toast.error("Some internal error occurred, contact admin");
      });
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
      {isAdmin && (
        <button
          onClick={() => { navigate("/addemployee") }}
          className="px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-red-600 rounded-md hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Add Employee
        </button>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-800 h-[100%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
            Search Employee
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium leading-6 text-slate-300">
                Employee ID
              </label>
              <div className="mt-2">
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
            </div>
          </form>

          {employeeDetails && (
            <div className="mt-8 text-sm text-gray-200 border border-white p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Employee Details</h3>
              <div className="text">
                <p>Employee ID: {employeeDetails.employeeId}</p>
                <p>Employee Name: {employeeDetails.employeeName}</p>
                <p>Organization Name: {employeeDetails.organizationName}</p>
                <p>Department ID: {employeeDetails.departmentId}</p>
                <p>Department Name:{employeeDetails.department.departmentName}</p>
                <p>Department Description:{employeeDetails.department.departmentDescription}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
