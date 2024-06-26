const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true},

  description: { type: String, required: true },
  price: {
    type: String,
    min: [0, "wrong min price"],
    max: [10000, "wrong max price"],
  },

  rating: {
    type: String,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  category: { type: String, required: true },
  img: { type: [String], required: true },
});

// const virtual = productSchema.virtual('id');
// virtual.get(function(){
//   return this._id;
// })
// productSchema.set('toJSON',{
//   virtuals:true,
//   versionKey:false,
//   transform:function(doc,ret){delete ret._id}
// })
exports.Product = mongoose.model("Product", productSchema);



