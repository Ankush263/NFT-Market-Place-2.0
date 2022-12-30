const NFT = require("../models/nftModel.js")
const APIFeatures = require("../utils/apiFeatures.js")

// -----------TOP 5 NFT---------------

exports.aliasTopNFTs = async (req, res, next) => {
  req.query.limit = '5',
  req.query.sort = "-ratingsAverage,price"
  req.query.fields = "name,price,ratingsAverage,difficulty"
  next()
}

// ----------GET METHOD------------

exports.getAllNFTs = async (req, res) => {
  try {
  
    const features = new APIFeatures(NFT.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination()
    const nfts = await features.query

    res.status(200).json({
      status: "Success",
      data: {
        nfts
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
  
}

// -----------POST METHOD-------------

exports.createNFT = async (req, res) => {

  try {
  const newNFT = await NFT.create(req.body)
  res.status(201).json({
    status: "Success",
    data: {
      nft: newNFT,
    }
  })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    })
  }

}

// ------------GET SINGLE NFT------------------

exports.getSingleNFT = async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id)
    res.status(200).json({
      status: "Success",
      data: {
        nft
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}

// -------------PATCH METHOD----------------

exports.updateNFT = async (req, res) => {
  try {
    const nft = await NFT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: "Success",
      data: {
        nft
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}

// ---------------DELETE METHOD---------------

exports.deleteNFT = async (req, res) => {
  
  try {
    await NFT.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: "Success",
      data: null
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
  
}

// -------------AGGREGATOR PIPELINE--------------

exports.getNFTsStats = async (req, res) => {
  try {
    // 'aggregate' pipeline, see mongoose doc.
    const stats = await NFT.aggregate([
      {
        $match: {ratingsAverage: {$gte: 4.5}}
      },
      {
        $group: {
          _id: {$toUpper: "$difficulty"},
          num: {$sum: 1},
          numRatings: {$sum: "$ratingsQuantity"},
          avgRating: {$avg: "$ratingsAverage"},
          avgPrice: {$avg: "$price"},
          minPrice: {$min: "$price"},
          maxPrice: {$max: "$price"},
        }
      },
      {
        $sort: {avgRating: 1}
      }
    ])
    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}

// ---------CALCULATING NO. OF NFT CREATE IN A MONTH / MONTHLY PLAN---------------

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year
    const plan = await NFT.aggregate([
      // "$unwind" deconstructs the array starts with "startDates"
      {
        $unwind: "$startDates"
      },
      // "$match" filters all documents based on "startDates"
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
      },
      // "$group" separate documents based on "_id", "numNFTStarts", & "nfts"
      {
        $group: {
          _id: {
            $month: "$startDates"
          },
          numNFTStarts: {
            $sum: 1
          },
          nfts: {
            $push: "$name"
          }
        }
      },
      {
        $addFields: {
          month: "$_id"
        }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numNFTStarts: -1
        }
      },
      // It limits the no. of result
      {
        $limit: 12,
      }
    ])
    res.status(200).json({
      status: "success",
      data: plan
    })
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error
    })
  }
}