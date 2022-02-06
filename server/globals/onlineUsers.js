// We use a map because we don't know what the value is before at runtime.
// This will be a hash map that will store key value pairs.
// The key representing a user's id and the value representing the array socket ids.
module.exports = onlineUsers = new Map();
