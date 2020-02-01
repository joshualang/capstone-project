const mongoose = require('mongoose')

const Profile = require('../models/Profile')
const User = require('../models/User')
const Vaccine = require('../models/Vaccine')

import { Request, Response } from 'express'
import { createVaccinationsFromVaccine } from '../helpers/createVaccinationsFromVaccine'
import { updateVaccinationsOpen } from '../helpers/updateVaccinationsOpen'

exports.profile_get_by_id = (req: Request, res: Response) => {
  const { profile } = req.params
  Profile.findById(profile)
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling GET request to /profile',
        profile: {
          _id: result._id,
          name: result.name,
          birth: result.birth,
          settings: result.settings,
          vaccinationsMade: result.vaccinationsMade,
          vaccinationsOpen: updateVaccinationsOpen(
            result.vaccinationsMade,
            result.birth
          ),
        },
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling GET request to /profile',
        error: err,
      })
    })
}

exports.profile_create_with_user_id = (req: Request, res: Response) => {
  const { user } = req.params
  const { birth, name } = req.body
  const profile = new Profile({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    birth: birth,
  })
  profile
    .save()
    .then((result: any) => {
      User.findByIdAndUpdate(user, {
        $push: { profiles: { _id: result._id, name: result.name } },
      })
        .exec()
        .then(() => {
          res.status(201).json({
            message: 'Handling POST request to profile/create',
            createdProfile: {
              _id: result._id,
              name: result.name,
              birth: result.birth,
              settings: result.settings,
              vaccinationsMade: result.vaccinationsMade,
              vaccinationsOpen: result.vaccinationsOpen,
            },
          })
        })
        .catch((err: object) => {
          console.log(err)
          res.status(500).json({
            message: 'Handling POST request to profile/create',
            error: err,
          })
        })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling POST request to profile/create',
        error: err,
      })
    })
}

exports.profile_delete_by_id = (req: Request, res: Response) => {
  const { profile } = req.params
  const { user } = req.body
  if (!user) {
    res
      .status(400)
      .json({ message: 'No id provided with user in request body' })
  }
  Profile.findByIdAndDelete(profile)
    .exec()
    .then(() => {
      User.findByIdAndUpdate(
        user,
        {
          $pull: { profiles: { _id: profile } },
        },
        { runValidators: false }
      )
        .exec()
        .then(() => {
          res.status(200).json({
            message: 'Handling DELETE request to /profile/delete',
            result: 'Profile deleted',
          })
        })
        .catch((err: object) => {
          console.log(err)
          res.status(500).json({
            message: 'Handling DELETE request to /profile/delete',
            error: err,
          })
        })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling DELETE request to /profile/delete',
        error: err,
      })
    })
}

exports.profile_update_settings = (req: Request, res: Response) => {
  const { profile } = req.params
  const settings = req.body.settings
  Profile.findByIdAndUpdate(
    profile,
    { settings: settings },
    { runValidators: true, new: true }
  )
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling PATCH request to /profile/settings',
        updatedProfile: result,
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling PATCH request to /profile/settings',
        error: err,
      })
    })
}

exports.profile_add_vaccination = (req: Request, res: Response) => {
  const { profile } = req.params
  const { date, vaccine, doctor } = req.body
  Vaccine.findOne({ name: vaccine })
    .exec()
    .then((result: any) => {
      Profile.findById(profile)
        .exec()
        .then((profileData: any) => {
          const birth = profileData.birth
          const newVaccinationsMade = createVaccinationsFromVaccine(
            date,
            birth,
            doctor,
            result.diseases,
            result.admittedApplicant,
            result.description,
            result.furtherInformation,
            result.name,
            result.registrationDate,
            result.registrationNumber
          )

          Profile.findByIdAndUpdate(
            profile,
            { $push: { vaccinationsMade: newVaccinationsMade } },
            { runValidators: true, new: true }
          )
            .then((update: any) =>
              res.status(201).json({
                message: 'Handling POST request to profile/vaccinations',
                result: newVaccinationsMade,
              })
            )
            .catch((err: object) => {
              console.log(err)
              res.status(500).json({
                message: 'Handling POST request to profile/vaccinations',
                error: err,
              })
            })
        })
        .catch((err: object) => {
          console.log(err)
          res.status(500).json({
            message: 'Handling POST request to profile/vaccinations',
            error: err,
          })
        })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling POST request to profile/vaccinations',
        error: err,
      })
    })
}
