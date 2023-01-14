const authRootDoc = require("../routes/doc/authDoc");
const userRootDoc = require("../routes/doc/userDoc");
const masterMenuRootDoc = require("../routes/doc/masterMenuDoc");
const subMenuRootDoc = require("../routes/doc/subMenuDoc");

const swaggerDocumation = {
  openapi: "3.0.0",
  info: {
    title: "Tribuana API",
    version: "0.0.1",
    description: "This is service api admintration Permahan Tribuana Permai 1",
  },
  paths: {
    ...authRootDoc,
    ...userRootDoc,
    ...masterMenuRootDoc,
    ...subMenuRootDoc,
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
