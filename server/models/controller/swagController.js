const swag = require("../swag");

module.exports = {
  read: (req, res, next) => {
    res.status(200).send(swag);
  }
};
