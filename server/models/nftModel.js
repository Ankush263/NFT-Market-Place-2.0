const mongoose = require("mongoose")
const slugify = require("slugify")

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "NFT name should be unique"],
    unique: true,
    trim: true,
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, "must provide duration"]
  },
  maxGroupSize: {
    type: Number,
    required: [true, "must have a group size"]
  },
  difficulty: {
    type: String,
    required: [true, "must have difficulty"]
  },
  ratingsAverage: {
    type: Number,
    required: [true, "must have ratingsAverage"]
  },
  ratingsQuantity: {
    type: Number,
    required: [true, "must have ratingsQuantity"]
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "must have summary"]
  },
  description: {
    type: String,
    required: [true, "must have description"]
  },
  imageCover: {
    type: String,
    required: [true, "must have imageCover"]
  },
  images: {
    type: [String],
    required: [true, "must have images"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: {
    type: [Date],
    required: [true, "must have startDates"]
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "A NFT must have a price"]
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtual: true }
})

// virtual property does not stored inside detabase, but when someone make req, it shows it.
nftSchema.virtual("durationWeeks").get(function(){
  return this.duration / 7
})

// ----------MONGOOSE MIDDLEWARE-----------

// DOCUMENT MIDDLEWARE: runs before .save() or .create()
nftSchema.pre("save", function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})

// nftSchema.pre("save", function(next) {
//   console.log("document will save....")
//   next()
// })

// nftSchema.post("save", function(doc, next) {
//   console.log(doc)
//   next()
// })

const NFT = mongoose.model("NFT", nftSchema)

module.exports = NFT