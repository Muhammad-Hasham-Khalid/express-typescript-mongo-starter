/* eslint-disable @typescript-eslint/ban-types */
import type {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export abstract class EntityRepository<
  DocType,
  QueryHelpers = {},
  InstanceMethods = {},
  Virtuals = {},
> {
  constructor(
    protected _model: Model<DocType, QueryHelpers, InstanceMethods, Virtuals>,
  ) {
    this.constructor.prototype = _model;
  }

  async findById(
    id: string,
    projection?: ProjectionType<DocType> | null,
    options?: QueryOptions<DocType> | null,
  ) {
    const entity = await this._model
      .findById(id, projection, options)
      .lean()
      .exec();
    return entity;
  }

  async findOne(
    query: FilterQuery<DocType>,
    projection?: ProjectionType<DocType> | null,
    options?: QueryOptions<DocType> | null,
  ) {
    const entity = await this._model
      .findOne(query, projection, options)
      .lean()
      .exec();
    return entity;
  }

  async exists(query: FilterQuery<DocType>): Promise<boolean> {
    const result = await this._model.exists(query).exec();
    return Boolean(result);
  }
}
