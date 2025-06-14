const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  storeName: String,
  storeAddress: String,
  cityName: String,
  regionName: String,
  retailerName: String,
  storeType: String,
  storeLongitude: Number,
  storeLatitude: Number,
  status: String,
  errorReason: String,
});

module.exports = mongoose.model("Record", recordSchema);
