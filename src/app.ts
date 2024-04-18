import 'express-async-errors';

import cors from 'cors';
import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { ErrorHandler } from '~/lib/error-handler';
import { StatusCodes } from 'http-status-codes';

class App {
  private readonly _app: Express;

  constructor() {
    this._app = express();

    this._initializeSecurity(this._app);
    this._initializeMiddleware(this._app);
    this._initializeRoutes(this._app);
    this._setupErrorHandler(this._app);
  }

  public start(): void {
    const server = http.createServer(this._app);
    const PORT = process.env.PORT ?? 3000;
    server.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  }

  private _initializeMiddleware(app: Express): void {
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private _initializeSecurity(app: Express): void {
    app.use(cors());
    app.use(helmet());
  }

  private _initializeRoutes(app: Express): void {
    // health check route
    app.route('/healthcheck').get((_req, res) => {
      return res.status(StatusCodes.OK).send('RUNNING');
    });
  }

  private _setupErrorHandler(app: Express): void {
    app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
      ErrorHandler.handleError(error, res);
    });
  }
}

export default new App();
