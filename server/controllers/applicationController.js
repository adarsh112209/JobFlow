const Application = require('../models/Application');

// @desc    Get logged in user's applications
// @route   GET /api/applications
const getApplications = async (req, res) => {
  // req.user is available because of our 'protect' middleware
  const applications = await Application.find({ user: req.user._id });
  res.json(applications);
};

// @desc    Create a new application
// @route   POST /api/applications
const createApplication = async (req, res) => {
  const { companyName, role, status, notes } = req.body;
  const application = new Application({
    user: req.user._id,
    companyName,
    role,
    status,
    notes,
  });
  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
};

// @desc    Update an application
// @route   PUT /api/applications/:id
const updateApplication = async (req, res) => {
    const { companyName, role, status, notes } = req.body;
    const application = await Application.findById(req.params.id);

    if (application && application.user.toString() === req.user._id.toString()) {
        application.companyName = companyName || application.companyName;
        application.role = role || application.role;
        application.status = status || application.status;
        application.notes = notes || application.notes;

        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } else {
        res.status(404).json({ message: 'Application not found or user not authorized' });
    }
};

// @desc    Delete an application
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
    const application = await Application.findById(req.params.id);

    if (application && application.user.toString() === req.user._id.toString()) {
        await application.deleteOne();
        res.json({ message: 'Application removed' });
    } else {
        res.status(404).json({ message: 'Application not found or user not authorized' });
    }
};


module.exports = { getApplications, createApplication, updateApplication, deleteApplication };