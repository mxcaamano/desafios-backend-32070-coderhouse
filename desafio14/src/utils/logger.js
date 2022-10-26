const { createLogger, format, transports } = require('winston');

const levelFilter = (level) =>
  format((info, opts) => {
     if (info.level != level) { return false; }
      return info;
  })();

const logger = createLogger({
  transports: [
    new transports.Console(),
    // new transports.File({
    //     filename: "logs/info.log",
    //     format: format.combine(
    //       levelFilter("info"),
    //       format.json()
    //     )
    // }),
    new transports.File({
        filename: "logs/warn.log",
        format: format.combine(
          levelFilter("warn"),
          format.json()
        )
    }),
    new transports.File({
        filename: "logs/error.log",
        format: format.combine(
          levelFilter("error"),
          format.json()
        )
    }),
  ]
});

module.exports = logger