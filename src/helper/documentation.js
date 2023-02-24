const authRootDoc = require("../routes/doc/authDoc");
const userRootDoc = require("../routes/doc/userDoc");
const masterMenuRootDoc = require("../routes/doc/masterMenuDoc");
const subMenuRootDoc = require("../routes/doc/subMenuDoc");
const permissionDoc = require("../routes/doc/permissionDoc");
const roleDoc = require("../routes/doc/roleDoc");

const swaggerDocumation = {
  openapi: "3.0.0",
  info: {
    title: "RBAC API",
    version: "0.0.1",
    description: "Api RBAC system",
    // description: "This is service api admintration Permahan Tribuana Permai 1",
  },
  paths: {
    ...authRootDoc,
    ...userRootDoc,
    ...masterMenuRootDoc,
    ...subMenuRootDoc,
    ...permissionDoc,
    ...roleDoc,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
module.exports = swaggerDocumation;
