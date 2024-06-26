// const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");

exports.singupUser = async (req, res) => {
  const { name ,email , password , confirmPassword } = req.body;
  console.log(name,email,password,confirmPassword)
  
  try {
    // Check if user with the given email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = 10;
    const hash_password = await bcrypt.hash(password, salt);

    // Create a new user
    const userCreated = await User.create({
      name,
      email,
      password: hash_password,
    });

    // Generate JWT token
    const payload = {
      userId: userCreated._id.toString(),
      username: userCreated.username,
      email: userCreated.email,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECURITY_KEY,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) {
          console.error("Error creating token:", err);
          return res.status(500).json({ error: "Error creating token" });
        } else {
          // Respond with the user data and generated token
          res.status(200).json({
            message: "User registered successfully",
            user: {
              _id: userCreated._id,
              username: userCreated.username,
              email: userCreated.email,
              phone: userCreated.phone,
              
            },
            token: token
          });
        }
      }
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(error => error.message);
        return res.status(400).json({ errors });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      // If email and password are correct, generate JWT token
      const payload = {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECURITY_KEY,
        { expiresIn: "30d" },
        (err, token) => {
          if (err) {
            console.error("Error creating token:", err);
            return res.status(500).json({ error: "Error creating token" });
          } else {
            // Respond with the user data and generated token
            res.status(200).json({
              message: "Login successful",
              user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
              },
              token: token,
            });
          }
        }
      );
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.userController = (req,res) =>{
    try {
      const userData = req.user;
      res.status(200).json({userData});
      
    } catch (error) {
      console.log("erroe",error);
      
    }

  }
  
  