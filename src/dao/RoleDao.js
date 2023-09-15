const SuperDao = require("./SuperDao");
const models = require("../models");

const Role = models.role;

class RoleDao extends SuperDao {
  constructor() {
    super(Role);
  }

  async isNameExists(name) {
    return Role.count({ where: { name } }).then((count) => {
      if (count != 0) {
        return true;
      }
      return false;
    });
  }
}

module.exports = RoleDao;
