const mongoose = require('mongoose'); 

const applicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  companyName: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    required: true,
    enum: ['Wishlist', 'Applied', 'Online Assessment', 'Interview', 'Offer', 'Rejected'],
    default: 'Wishlist',
  },
  notes: { 
    type: String,
    default: ''
  },
  applicationDeadline: { type: Date },
  assessmentDate: { type: Date },
}, { 
  timestamps: true 
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;