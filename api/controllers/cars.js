
const { Car, CarHistory } = require('../models/Car')
const { CarsEnum } = require('../commons/enums/Cars')
const mongoose = require('mongoose')


module.exports = (app) => {
    const controller = {}
    controller.register = async (req, res) => {
        const { name, imei, type } = req.body
        const verifyImei = await Car.findOne({ where: { imei } })
        if(verifyImei) {
            return res.status(400).json({ message: 'Imei already exists' })
        }
        if(!CarsEnum.values().includes(type)) {
            return res.status(400).json({ message: 'Invalid type' })
        }
        try {
            const car = new Car({ name, imei, type, createdAt: new Date() });
            await car.save();
            return res.status(200).json(car)
        }
        catch(e) {
            return res.status(400).json({ message: "Error" })
        }
    }
    controller.registerHistory = async (req, res) => {
        const { imei, latLng, createdAt } = req.body
        try {
            const car = await Car.findOne({ imei: imei })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = new CarHistory({ carId: car.id, latLng, createdAt });
            await carHistory.save();
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(400).json(e)
        }
    }
    controller.getCars = async (req, res) => {
        try {
            const cars = await Car.findAll()
            return res.status(200).json(cars)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    controller.getCarHistory = async (req, res) => {
        const { imei } = req.params
        try {
            const car = await Car.findOne({ where: { imei } })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = await CarHistory.findAll({ where: { carId: car.id } })
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    controller.getCarHistoryAll = async (req, res) => {
        try {
          const carHistory = await CarHistory.find().sort({ createdAt: -1 })
          .limit(3);
          return res.status(200).json(carHistory)
        } catch (e) {
          console.error(e)
          return res.status(500).json(e)
        }
      }
      
    controller.getCarHistoryByDate = async (req, res) => {
        const { imei } = req.params
        const { date } = req.query
        try {
            const car = await Car.findOne({ where: { imei } })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = await CarHistory.find({ where: { carId: car.id, createdAt: date } })
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    controller.getCarHistoryByDateRange = async (req, res) => {
        const { imei } = req.params
        const { startDate, endDate } = req.query
        try {
            const car = await Car.findOne({ where: { imei } })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = await CarHistory.findAll({ where: { carId: car.id, createdAt: { $between: [startDate, endDate] } } })
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    controller.getCarHistoryByDateRangeAndStatus = async (req, res) => {
        const { imei } = req.params
        const { startDate, endDate, status } = req.query
        try {
            const car = await Car.findOne({ where: { imei } })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = await CarHistory.findAll({ where: { carId: car.id, createdAt: { $between: [startDate, endDate] }, status } })
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }
    controller.getCarHistoryByDateRangeAndStatusAndType = async (req, res) => {
        const { imei } = req.params
        const { startDate, endDate, status, type } = req.query
        try {
            const car = await Car.findOne({ where: { imei } })
            if(!car) {
                return res.status(404).json({ message: 'Car not found' })
            }
            const carHistory = await CarHistory.findAll({ where: { carId: car.id, createdAt: { $between: [startDate, endDate] }, status, type } })
            return res.status(200).json(carHistory)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    }

    return controller
}