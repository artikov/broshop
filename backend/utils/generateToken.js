import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV !== "development", // true if in production
    sameSite: "strict",
  });
};

export default generateToken;
