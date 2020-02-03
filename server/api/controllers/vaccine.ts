const mongoose = require('mongoose')
const Vaccine = require('../models/Vaccine')

import { Request, Response } from 'express'

exports.vaccine_get_all = (req: Request, res: Response) => {
  Vaccine.find()
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling GET request to vaccine/',
        vaccine: result,
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling GET request to vaccine/',
        error: err,
      })
    })
}

exports.vaccine_get_by_name = (req: Request, res: Response) => {
  const { vaccine } = req.params
  Vaccine.findOne({ name: vaccine })
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling GET request to vaccine/',
        vaccine: result,
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling GET request to vaccine/',
        error: err,
      })
    })
}

exports.vaccine_add = (req: Request, res: Response) => {
  const {
    admittedApplicant,
    description,
    diseases,
    furtherInformation,
    name,
    registrationDate,
    registrationNumber,
  } = req.body
  const vaccine = new Vaccine({
    _id: new mongoose.Types.ObjectId(),
    admittedApplicant: admittedApplicant,
    description: description,
    diseases: diseases,
    furtherInformation: furtherInformation,
    name: name,
    registrationDate: registrationDate,
    registrationNumber: registrationNumber,
  })

  vaccine
    .save()
    .then((result: any) => {
      res.status(201).json({
        message: 'Handling POST request to vaccine/',
        vaccine: result,
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling POST request to vaccine/',
        error: err,
      })
    })
}

exports.vaccine_delete_by_id = (req: Request, res: Response) => {
  const { id } = req.params
  Vaccine.findByIdAndDelete(id)
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling DELETE request to vaccine/',
        result: 'Vaccine deleted',
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling DELETE request to vaccine/',
        error: err,
      })
    })
}
