import { createLogger, format, transports } from 'winston';

const { simple, json } = format;
const { File, Console } = transports;

export const Logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: json(),
  transports: [
    new File({ filename: 'error.log', level: 'error' }),
    new File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  const transportConsole = new Console({ format: simple() });
  Logger.add(transportConsole);
}
