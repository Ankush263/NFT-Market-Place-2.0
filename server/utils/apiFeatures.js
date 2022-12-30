class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    // ------------BUILD QUERY-----------
    const queryObj = {...this.queryString}
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach(el => delete queryObj[el])

    // -------------ADVANCE FILTERING QUERY---------------
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|let|lt)\b/g, match => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    // this.query = NFT.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    // ----------SORTING NFT------------
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ")
      console.log(sortBy)
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort("-createdAt")
    }
    return this
  }

  limitFields() {
    // ---------FIELDS LIMITING-----------
    if(this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ")
      this.query = this.query.select(fields)
    }else {
      this.query = this.query.select("-__v")
    }
    return this
  }

  pagination() {
    // -----------PAGINATION-------------
    // page = 1, 1-10, page = 2, 11-20, page = 3, 21-30
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 10
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    // if(this.queryString.page) {
    //   const newNFTs = await NFT.countDocuments()
    //   if(skip >= newNFTs)
    //   throw new Error("This page doesn't exists")
    // }
    return this
  }
}

module.exports = APIFeatures