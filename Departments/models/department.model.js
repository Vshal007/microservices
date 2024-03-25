import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    required: true,
    unique: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  departmentDescription: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
