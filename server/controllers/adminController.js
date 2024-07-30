const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GetAllAccounts
const GetAllAccounts = async (_, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ data: admins, total: admins.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get Admin
const GetAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res.status(200).json({ data: admin });
  } catch (error) {
    console.error("Error in GetAdminById:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// create Account
const CreateAccount = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
      return res.status(400).json({ error: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({
      message: "New admin created!",
      data: newAdmin,
    });
  } catch (error) {
    console.error("Error in CreateAccount:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// LoginToAccount
const LoginToAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await Admin.findOne({ email });
    if (!exist) {
      return res.json({ AdminNotFound: "Admin not found" });
    }
    const isPassEqual = await bcrypt.compare(password, exist.password);
    if (!isPassEqual) {
      return res.json({ PasswordIsNotCorrect: "Password is not correct!" });
    }
    const token = jwt.sign({ exist }, process.env.JWTSECRETKEY, {
      expiresIn: "7d",
    });
    res.json({ data: exist, token });
  } catch (err) {
    res.json({ error: err });
  }
};

// DeleteAccount
const DeleteAccount = async (req, res) => {
  try {
    const removedAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.json({ data: removedAdmin, message: "Admin o'chirildi" });
  } catch (err) {
    res.json({ error: err });
  }
};

// updateAccount
const UpdateAccount = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    res.status(200).json({
      message: "Admin updated successfully!",
      data: updatedAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  GetAllAccounts,
  GetAdminById,
  CreateAccount,
  LoginToAccount,
  DeleteAccount,
  UpdateAccount,
};
