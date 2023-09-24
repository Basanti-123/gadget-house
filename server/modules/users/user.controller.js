const Model = require("./user.model");

const create = (payload) => {
  return Model.create(payload);
};
const list = () => {
  return Model.find();
};

module.exports = { list, create };