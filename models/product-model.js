const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  product_category_id: {
    type: String,
    default: ""
  },
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  featured: String,
  deleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  deletedBy: {
    account_id: String,
    deletedAt: {
      type: Date,
      default: Date
    }
  },
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ],
  recoveryBy: {
    account_id: String,
    recoveryAt: {
      type: Date,
      default: Date
    }
  }
},
  {
    timestamps: true
  })
const products = mongoose.model("Products", productSchema, 'products')
module.exports = products