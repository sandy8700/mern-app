const { validationResult } = require("express-validator");
const CaptainService = require("../services/captain.service");
const CaptainModel = require("../models/captain.model");
const blackListTokenModel = require('../models/blacklistToken.model');

 module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle, location } = req.body;

    try {
        const existingCaptain = await CaptainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const hashedPassword = await CaptainModel.hashPassword(password);

        const captain = await CaptainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            ltd: location.ltd,
            lng: location.lng
        });
        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json( {captain: req.captain})
};

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await CaptainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await captain.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports.logoutCaptain = async (req, res) => {
     res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    
        await blackListTokenModel.create({ token });
    
        res.status(200).json({ message: 'Logged out' });
};
