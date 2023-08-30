const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("./config");

const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    // eslint-disable-next-line no-param-reassign
    info.message = {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message,
    };
  }

  if (info instanceof Error) {
    return { message: info.message, stack: info.stack, ...info };
  }

  return info;
});
const transport = new DailyRotateFile({
  filename: config.logConfig.logFolder + config.logConfig.logFile,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "3",
  prepend: true,
});
// eslint-disable-next-line no-unused-vars
transport.on("rotate", (oldFilename, newFilename) => {
  // call function like upload to s3 or on cloud
});

const logger = winston.createLogger({
  format: winston.format.combine(enumerateErrorFormat(), winston.format.json()),
  transports: [
    transport,
    new winston.transports.Console({
      level: "info",
    }),
  ],
});
module.exports = logger;
