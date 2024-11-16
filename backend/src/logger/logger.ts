import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const winstonLoggerConfig: WinstonModuleOptions = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
    }),
  ],
};
