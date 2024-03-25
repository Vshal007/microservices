// user.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {Employee} from '../models/employee.model.js'; // Import the Employee model

// Existing login and signup functions...

// -------------- CREATE EMPLOYEE -------------------------
export const createEmployee = async (req, res) => {
    try {
        const { employeeId, employeeName, organizationName, departmentId } = req.body;

        // Check if the employeeId already exists
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({ success: false, message: 'Employee ID already exists' });
        }

        // Create the new employee
        const newEmployee = await Employee.create({
            employeeId,
            employeeName,
            organizationName,
            departmentId,
        });

        res.status(201).json({ success: true, message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }
};

// Existing getById function...

export const getById = async (req, res) => {
    try {
        let id = req.params['id'];
        let user = await User.findById(id);
        res.json({ success: true, user });
    } catch (error) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }
};

// -------------- FIND EMPLOYEE BY ID -------------------------
// export const findEmployeeById = async (req, res) => {
//     try {
//         const { employeeId } = req.params;

//         // Find the employee based on the employeeId
//         const employee = await Employee.findOne({ employeeId });

//         if (!employee) {
//             return res.status(404).json({ success: false, message: 'Employee not found' });
//         }

//         res.status(200).json({ success: true, employee });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, message: 'Internal server error', error: err });
//     }
// };

export const findEmployeeById = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find the employee based on the employeeId
        const employee = await Employee.findOne({ employeeId });

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Fetch department info using Axios
        const departmentId = employee.departmentId;
        const departmentResponse = await axios.get(`http://localhost:8000/api/dep/departments/${departmentId}`);

        if (!departmentResponse.data.success) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }

        const department = departmentResponse.data.department;

        // Include department info in the response
        const employeeWithDepartment = { ...employee.toObject(), department };

        res.status(200).json({ success: true, employee: employeeWithDepartment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }
};