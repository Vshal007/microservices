import Department from '../models/department.model.js';

// Function to get department by departmentID
export const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Find the department by departmentId
    const department = await Department.findOne({ departmentId });

    if (!department) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }

    // Return the department
    res.status(200).json({ success: true, department });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error', error: err });
  }
};

export const createDepartment = async (req, res) => {
    try {
      const { departmentId, departmentName, departmentDescription } = req.body;
  
      // Check if the departmentId already exists
      const existingDepartment = await Department.findOne({ departmentId });
      if (existingDepartment) {
        return res.status(400).json({ success: false, message: 'Department with this ID already exists' });
      }
  
      // Create a new department
      const newDepartment = await Department.create({
        departmentId,
        departmentName,
        departmentDescription,
      });
  
      res.status(201).json({ success: true, message: 'Department created successfully', department: newDepartment });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }
  };