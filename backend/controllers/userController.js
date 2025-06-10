import jwt from 'jsonwebtoken';



const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      return res.json({ success: true, message: "Admin login successful", token });
    }else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.json({ success: false, message: error.message });
  }

}

export { adminLogin };