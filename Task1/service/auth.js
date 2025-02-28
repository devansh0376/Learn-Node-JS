// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// module.exports = {
//   setUser,
//   getUser,
// };

const jwt = require("jsonwebtoken");
const secret = "dev@123"; // Ensure this is the same in both functions

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email , role:user.role },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("JWT Verification Failed:", error.message); // 🔹 Debugging
    return null;
  }
}

module.exports = { setUser, getUser };
