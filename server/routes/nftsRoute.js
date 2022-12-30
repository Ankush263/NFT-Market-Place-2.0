const express = require("express")
const {
  getAllNFTs,
  createNFT,
  getSingleNFT,
  updateNFT,
  deleteNFT,
  aliasTopNFTs,
  getNFTsStats,
  getMonthlyPlan
  // checkId,
  // checkBody
} = require("../controllers/nftControllers")

const router = express.Router()

// -----------TOP NFT BY PRICE-------------
router.route('/top-5-nfts').get(aliasTopNFTs, getAllNFTs)

// --------------STATS ROUTER----------------
router.route("/nfts-stats").get(getNFTsStats)

// --------------GET MONTHLY PLAN--------------
router.route("/monthly-plan/:year").get(getMonthlyPlan)



// router
//   .param("id", checkId)

// ------------ROUTER NFTs--------------

router
  .route("/")
    .get(getAllNFTs)
    // .post(checkBody, createNFT)
    .post(createNFT)

router
  .route("/:id")
    .get(getSingleNFT)
    .patch(updateNFT)
    .delete(deleteNFT)

module.exports = router
