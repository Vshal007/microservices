import express from 'express';
import { getDepartmentById, createDepartment } from '../controllers/department.controller.js';

const router = express.Router();

// Route to get department by departmentID
router.get('/departments/:departmentId', getDepartmentById);

// Route to create a new department
router.post('/createdepartment', createDepartment);

export default router;
