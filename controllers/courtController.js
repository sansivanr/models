const CourtModel = require('../models/Court'); // Adjust according to your model's path

// Get all courts
const getAllCourts = async (req, res) => {
    try {
        const courts = await CourtModel.find();
        res.json(courts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courts', error });
    }
};

// Add a new court
const addCourt = async (req, res) => {
    const { name } = req.body; // Expecting court name in request
    try {
        const newCourt = new CourtModel(req.body);
        await newCourt.save();
        res.status(201).json({ message: 'Court added successfully', court: newCourt });
    } catch (error) {
        res.status(500).json({ message: 'Error adding court', error });
    }
};

// Update court information
const updateCourt = async (req, res) => {
    const { id } = req.params; // Expecting court ID in params
    const { name } = req.body; // Expecting updated court name in request
    try {
        const court = await CourtModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!court) return res.status(404).json({ message: 'Court not found' });
        res.json({ message: 'Court updated successfully', court });
    } catch (error) {
        res.status(500).json({ message: 'Error updating court', error });
    }
};

// Delete a court
const deleteCourt = async (req, res) => {
    const { id } = req.params; // Expecting court ID in params
    try {
        const court = await CourtModel.findByIdAndDelete(id);
        if (!court) return res.status(404).json({ message: 'Court not found' });
        res.json({ message: 'Court deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting court', error });
    }
};

module.exports = {
    getAllCourts,
    addCourt,
    updateCourt,
    deleteCourt,
};
