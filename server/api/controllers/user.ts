const mongoose = require('mongoose')
const User = require('../models/User')
const Profile = require('../models/Profile')

import { Request, Response } from 'express'

exports.user_get_by_id = (req: Request, res: Response) => {
  const { uid } = req.params
  User.findOne({ uid: uid })
    .select('-__v')
    .exec()
    .then((result: any) => {
      res.status(200).json({
        message: 'Handling GET request to user/',
        user: { _id: result._id, uid: result.uid, profiles: result.profiles },
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
  const { uid } = req.params
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
        uid: uid,
        profiles: [{ _id: result._id, name: result.name }],
      })
      user
        .save()
        .then((result: any) => {
          res.status(201).json({
            message: 'Handling POST request to user/createuser',
            createdUser: {
              _id: result._id,
              uid: result.uid,
              profiles: result.profiles,
            },
          })
        })
        .catch((err: object) => {
          console.log(err)
          res.status(500).json({
            message: 'Handling POST request to user/createuser',
            error: err,
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
  const { uid } = req.params
  User.findOneAndDelete({ uid: uid })
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
