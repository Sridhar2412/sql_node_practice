const User = require('../models/user_model');

const{getUserData,setUser}=require('../services/auth_service')
// Controller function to handle GET /Users request

//Get user
async function getUserByToken(req, res) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract the token
    if(!token) return res.status(401).json({"status":"ERROR","code":"400",'error': { 'message':'Unauthorized' }});
    // Validate the token here
    // const user=
     await getUserData(token, res);
    // return res.json({"status":"OK","code":"200","data":user});
  } else {
    return res.status(401).json({"status":"ERROR","code":"400",'error': { 'message':'Unauthorized' }});
  }
 
}

const getUsers = async (req, res) => {
  try {
    const user = await User.findAll(); // Fetch all Users
    if (user==null) return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'Users not found' }});
    return res.status(200).json({"status":"OK","code":"200","data":user});
    }catch(e){
    return res.status(400).json({"status":"ERROR","code":"400", 'error':{ 'message':`${e}`}});
}
};

// Controller function to handle GET /Users/:id request
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId); // Fetch User by primary key (ID)
    if (user==null) return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'User not found' }});
        return res.status(200).json({"status":"OK","code":"200","data":user});
    }catch(e){
        return res.status(400).json({"status":"ERROR","code":"400", 'error':{ 'message':`${e}`}});
    }
};

// Controller function to handle POST /Users request
const saveUser = async (req, res) => {
  const { fullname, email, mobile,password } = req.body;
  try {
    const user = await User.create({
     
      mobile,
      fullname,
      email,
      password,
    });
    res.status(201).json(user); // Return the created User
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create User' });
  }
};

const updateUser = async (req, res) => {
    const  userId = req.params.id;  // Get userId from the URL parameter
    const { mobile, fullname, email ,password} = req.body;  // Get the new user data from the request body
  
    try {
      // Prepare the update object with only the fields that were provided
      const updateData = {};
  
      if (mobile) updateData.mobile = mobile;
      if (fullname) updateData.fullname = fullname;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
  
      // Update the user in the database
      const [updated] = await User.update(updateData, {
        where: { userId: userId },  // Only update the user with the specified userId
      });
  
      if (updated) {
        return res.status(200).json({"status":"OK","code":"200","data":'User updated successfully'});
      } else { 
        return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'User not found' }});
      }
    }catch(e){
        return res.status(400).json({"status":"ERROR","code":"400", 'error':{ 'message':`${e}`}});
    }
  };
  

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.destroy({
        where: { userId: userId }
      }); // Fetch User by primary key (ID)
      if (!user) {
        return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'User not found' }});
      }
      return res.status(200).json({"status":"OK","code":"200","data":user});
    } catch (err) {
      console.error(err);
      return res.status(400).json({"status":"ERROR","code":"400", 'error':{ 'message':`${e}`}});
    }
  };

  async function login(req, res){
    const body=req.body;
  //   console.log(body);
    // console.log(await User.findAll());
    // console.log(body.password);
    if(!body.email || !body.password) return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'Enter username and password' }});
   
    const email = await User.findOne({where:{ email: body.email}});
    if(!email) return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'User not found' }});
   
    const password = await User.findOne({where:{ password: body.password.toString()}});
    if(!password) return res.status(400).json({"status":"ERROR","code":"400",'error': { 'message':'Bad Credentials' }});
    
    const user = await User.findOne({where:{ email: body.email, password: body.password.toString()}});
    // console.log(user);
    if(user) 
      var token=setUser(user);
      return res.status(200).json({"status":"OK","code":"200","data":{'accessToken':token,}});
  }

module.exports = {
  getUserByToken,
  getUsers,
  saveUser,
  getUserById,
  updateUser,
  deleteUser,
  login
};
