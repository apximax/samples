import {Types} from 'mongoose';

import {
  purify,
  catcher,
} from './utility';

export default function crud(Model, exclude = []) {
  const assigned = {

    async one(condition = {}) {
      try {
        const document = await Model.findOne(condition);

        return purify(document, exclude);
      } catch(error) {
        catcher(error);
      }
    },

    async self(condition = {}) {
      try {
        const document = await Model.findOne(condition);

        return purify(document);
      } catch(error) {
        catcher(error);
      }
    },

    // TODO: need to return position of cursor
    async search(condition = {}, options = {}) {
      const {limit = 20, skip = 0, sort} = options;

      try {
        const total = await Model.count(condition);

        const raw = await Model
          .find(condition)
          .skip(skip)
          .limit(limit)
          .sort(sort);

        const documents = raw
          .map(document =>
            purify(document, exclude));

        const meta = {
          total,
          limit,
          page: Math.floor(skip / limit) + 1,
          pages: Math.ceil(total / limit),
        };

        return {documents, meta};

      } catch(error) {
        catcher(error);
      }
    },

    async create(data) {
      try {
        const document = await new Model(data).save();

        return purify(document, exclude);
      } catch(error) {
        catcher(error);
      }
    },

    async update(id, options) {
      const instructions = {
        'new': true,
        context: 'query',
        runValidators: true,
      };

      const query = Object.assign({
        '$currentDate': {modified_at: true},
      }, options);

      try {
        const document = await Model.findOneAndUpdate({
          _id: Types.ObjectId(id),
        }, query, instructions);

        return purify(document, exclude);
      } catch (error) {
        catcher(error);
      }
    },

    async remove(id) {
      try {
        return await Model.findByIdAndRemove({_id: Types.ObjectId(id)});
      } catch(error) {
        catcher(error);
      }
    },

    async removeByQuery(condition) {
      try {
        return await Model.remove(condition);
      } catch(error) {
        catcher(error);
      }
    },

    async edit(id, fields) {
      return await assigned.update(id, {'$set': fields});
    },
  };

  return assigned;
}