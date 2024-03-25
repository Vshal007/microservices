// routes/api.js
import express from 'express';
import { findEmployeeById,createEmployee} from '../controllers/employee.controller.js';

const router = express.Router();

// Route for finding an employee by employeeId
router.get('/employees/:employeeId', findEmployeeById);
router.post('/addemployee', createEmployee);

export default router;
