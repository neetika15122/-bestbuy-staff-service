// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
 
// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;
 
// Middleware
app.use(bodyParser.json());
 
// In-memory storage for staff
const staffList = [];
 
// REST API Endpoints
 
// Create new staff member
app.post('/staff', (req, res) => {
  try {
    const { name, position, department, email, phone } = req.body;
    if (!name || !position || !department || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newStaff = { id: uuidv4(), name, position, department, email, phone };
    staffList.push(newStaff);
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Get all staff members
app.get('/staff', (req, res) => {
  try {
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Get a single staff member by ID
app.get('/staff/:id', (req, res) => {
  try {
    const staff = staffList.find((s) => s.id === req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff member not found' });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Update a staff member by ID
app.put('/staff/:id', (req, res) => {
  try {
    const { name, position, department, email, phone } = req.body;
    const staffIndex = staffList.findIndex((s) => s.id === req.params.id);
    if (staffIndex === -1) return res.status(404).json({ message: 'Staff member not found' });
 
    if (!name || !position || !department || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
 
    const updatedStaff = { id: req.params.id, name, position, department, email, phone };
    staffList[staffIndex] = updatedStaff;
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Delete a staff member by ID
app.delete('/staff/:id', (req, res) => {
  try {
    const staffIndex = staffList.findIndex((s) => s.id === req.params.id);
    if (staffIndex === -1) return res.status(404).json({ message: 'Staff member not found' });
    staffList.splice(staffIndex, 1);
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Staff service is healthy' });
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});