/* eslint-disable @typescript-eslint/ban-types */
import type { FilterQuery, Model } from 'mongoose';

export abstract class EntityRepository<
  DocType,
  QueryHelpers = {},
  InstanceMethods = {},
  Virtuals = {},
> {
  constructor(protected _model: Model<DocType, QueryHelpers, InstanceMethods, Virtuals>) {}

  async findById(id: string) {
    const user = await this._model.findById(id).lean().exec();
    return user;
  }

  async findOne(query: FilterQuery<DocType>) {
    const user = await this._model.findOne(query).lean().exec();
    return user;
  }

  async exists(query: FilterQuery<DocType>): Promise<boolean> {
    const result = await this._model.exists(query).exec();
    return Boolean(result);
  }
}
