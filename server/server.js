const dotenv = require("dotenv")
const mongoose = require("mongoose")
const app = require("./app")
const NFT = require("./models/nftModel.js")

dotenv.config({ path: "./config.env" })

// -----------General convension----------
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

// -----------General convension----------
mongoose.connect(DB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
}).then((con) => {
  // console.log(con.connection)
  console.log("DB connected successfully!!!")
})

const testNFT = new NFT({
  name: "The Crazy Monkey",
  rating: 3,
  price: 345
})

testNFT.save().then((e) => {
  console.log(e)
}).catch((error) => {
  console.log(error)
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`You are listening to the port ${port}`)
})
