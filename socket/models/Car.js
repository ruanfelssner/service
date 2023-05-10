const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const { CarsEnum } = require('../commons/enums/Cars');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imei: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: CarsEnum,
    default: CarsEnum.CAR,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const carHistorySchema = new mongoose.Schema({
  imei: String,
  latLng: Object,
  createdAt: Date,
});

module.exports = {
  Car: mongoose.model('Car', carSchema),
  CarHistory: mongoose.model('CarHistory', carHistorySchema),
}