const User = require('../models/user_model');

// Controller function to handle GET /Users request
const getUsers = async (req, res) => {
  try {
    const Users = await User.findAll(); // Fetch all Users
    res.json(Users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Users' });
  }
};

// Controller function to handle GET /Users/:id request
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); // Fetch User by primary key (ID)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch User' });
  }
};

// Controller function to handle POST /Users request
const saveUser = async (req, res) => {
  const { fullname, email, mobile } = req.body;
  try {
    const user = await User.create({
     
      mobile,
       fullname,
      email,
    });
    res.status(201).json(user); // Return the created User
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create User' });
  }
};

const updateUser = async (req, res) => {
    const  userId = req.params.id;  // Get userId from the URL parameter
    const { mobile, fullname, email } = req.body;  // Get the new user data from the request body
  
    try {
      // Prepare the update object with only the fields that were provided
      const updateData = {};
  
      if (mobile) updateData.mobile = mobile;
      if (fullname) updateData.fullname = fullname;
      if (email) updateData.email = email;
  
      // Update the user in the database
      const [updated] = await User.update(updateData, {
        where: { userId: userId },  // Only update the user with the specified userId
      });
  
      if (updated) {
        return res.status(200).json({ message: 'User updated successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user', error });
    }
  };
  

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.destroy({
        where: { userId: userId }
      }); // Fetch User by primary key (ID)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch User' });
    }
  };

module.exports = {
  getUsers,
  saveUser,
  getUserById,
  updateUser,
  deleteUser,
};
