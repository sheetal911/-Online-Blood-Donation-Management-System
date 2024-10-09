const requirementSchema = require('../models/requirement');
const User = require('../models/user');

// Fetch all blood requirements from the database
exports.requirements = async (req, res) => {
  try {
    const requirements = await requirementSchema.find().lean();
    res.status(200).json(requirements);
    console.log('Listed all requirements')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a blood requirement
exports.createRequirement = async (req, res) => {
  try {
    const {reqId, name, bloodgroup, phone, hospitaloc, units } = req.body;
    var user = req.user;
    user = await User.findOne(user).lean();
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newRequirement = new requirementSchema({
      reqId,
      userId: user.userId,
      name, 
      bloodgroup, 
      phone, 
      hospitaloc, 
      units
    });

    await newRequirement.save();
    console.log('Created a new requirement');
    res.status(201).json({ message: 'Blood requirement created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
