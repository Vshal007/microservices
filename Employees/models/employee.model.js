import mongoose from "mongoose";

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
        required: true,
    },
    departmentId: {
        type: String,
        required: true,
    },
});

// Create the Employee model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

export { Employee };
