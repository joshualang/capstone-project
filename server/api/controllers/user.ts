const mongoose = require('mongoose')
const User = require('../models/User')
const Profile = require('../models/Profile')

import { Request, Response } from 'express'

exports.user_get_by_id = (req: Request, res: Response) => {
  const { user } = req.params
  User.findById(user)
    .select('-__v')
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling GET request to user/',
        user: result,
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling GET request to user/',
        error: err,
      })
    })
}

exports.user_create = (req: Request, res: Response) => {
  const { birth, name } = req.body
  const profile = new Profile({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    birth: birth,
  })
  profile
    .save()
    .then((result: any) => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        profiles: [{ _id: result._id, name: result.name }],
      })
      user.save().then((result: any) => {
        res.status(201).json({
          message: 'Handling POST request to user/createuser',
          createdUser: { _id: result._id, profiles: result.profiles },
        })
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling POST request to user/createuser',
        error: err,
      })
    })
}

exports.user_delete_by_id = (req: Request, res: Response) => {
  const { user } = req.params
  User.findByIdAndDelete(user)
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling DELETE request to user/delete',
        result: 'User deleted',
      })
    })
    .catch((err: object) => {
      console.log(err)
      res.status(500).json({
        message: 'Handling DELETE request to user/delete',
        error: err,
      })
    })
}
