import Mongoose from 'mongoose';

const Category = new Mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Label is required'],
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  attributes: [{
    _id: false,
    name: String,
    label: String,
    type: {
      type: String,
      enum: ['enum', 'bool', 'value', 'radio'],
      default: 'value',
    },
    required: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 1,
    },
    filter: {
      type: Boolean,
      default: true,
    },
    prefix: String,
    options: [],
  }],

  parent: {
    ref: 'Category',
    type: Mongoose.Schema.Types.ObjectId,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default Category;