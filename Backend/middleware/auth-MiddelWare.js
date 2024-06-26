const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");
// const User = require("../model/user-model");


exports.authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
        const jwtToken = token.replace("Bearer", "").trim();
        if (!jwtToken) {
            // throw new jwt.JsonWebTokenError("jwt must be provided");
        }
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECURITY_KEY);
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        if (!userData) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        // console.log("annsvasasa",req.userId)

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError && error.message === "jwt must be provided") {
            // If the error is specifically that JWT must be provided, return Unauthorized
            console.log(error);
            return res.status(401).json({ msg: "JWT token is missing" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            // If the error is related to JWT but not "jwt must be provided", it's likely a token issue
            console.log(error);
            return res.status(401).json({ msg: "Invalid JWT token" });
        } else {
            // For other errors, log the error and return Unauthorized
            console.log(error);
            return res.status(401).json({ msg: "Unauthorized" });
        }
    }
};
