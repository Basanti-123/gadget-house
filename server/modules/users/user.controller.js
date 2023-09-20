const bcrypt = require("bcrypt");
const saltRounds = 10;
const Model = require("./user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);
  return Model.create(rest);
};

const login = async (email, password) => {
  const isValidUser = await Model.findOne({ email });
  if (!isValidUser) throw new Error("User not found");
  const isValid = await bcrypt.compare(password, isValidUser.password);
  if (!isValid) throw new Error("Email or Password is invalid");
  return true;
};

module.exports = { create, login };