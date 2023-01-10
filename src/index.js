const express = require("express");
const logger = require("./logger");
const routes = require("./routes");
const connectToDatabase = require("./database");
const app = express();
const port = process.env.PORT || 3000;
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumation = require("./helper/documentation");
const baseResponse = require("./helper/responseDefault");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("./helper/swagger-ui.css", express.static("./helper/swagger-ui.css"));
app.use((err, req, res, next) => {
  logger.error(err.stack);
  // res.status(err.statusCode || 500).send({ error: err.message });
  baseResponse(res, err.statusCode, err.message, {});
});
const options = { customCssUrl: "./helper/swagger-ui.css" };
app.use("/api/doc", swaggerDoc.serve);
app.get("/api/doc", swaggerDoc.setup(swaggerDocumation, options));

async function startServer() {
  await connectToDatabase();

  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
