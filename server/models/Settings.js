const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  branding: {
    logo: {
      type: String,
      default: null
    },
    primaryColor: {
      type: String,
      default: '#007bff',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
    },
    secondaryColor: {
      type: String,
      default: '#6c757d',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
    },
    fontFamily: {
      type: String,
      enum: ['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Roboto', 'Open Sans', 'Lato'],
      default: 'Roboto'
    },
    customHtml: {
      type: String,
      maxlength: [2000, 'Custom HTML cannot exceed 2000 characters'],
      default: ''
    }
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

// Ensure virtual fields are serialized
settingsSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Settings', settingsSchema);