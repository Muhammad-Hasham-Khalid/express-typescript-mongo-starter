import { type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '~/lib/logger';
import crypto from 'node:crypto';

export class ServerEventEmitter {
  private readonly _id = crypto.randomUUID();

  constructor(private readonly _stream: Response) {
    Logger.info(`initialized ServerEventEmitter with id ${this._id}`);
    this._stream.writeHead(StatusCodes.OK, {
      'content-type': 'text/event-stream',
      connection: 'keep-alive',
      'cache-control': 'no-cache',
      'x-accel-buffering': 'no',
    });
    this._stream.flushHeaders();
    this._stream.on('close', () => this._stream.end());
  }

  public emit(event: string, data: string) {
    this._stream.write(`event: ${event}\n`);
    this._stream.write(`data: ${data}\n\n`);
  }

  public dispose() {
    this._stream.end();
    Logger.info(`disposed ServerEventEmitter with id ${this._id}`);
  }

  // NOTE: keep this line if you are using the using keyword otherwise remove it
  public [Symbol.dispose]() {
    this.dispose();
  }
}
