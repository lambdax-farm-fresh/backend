// WILL BE UPDATED / REPLACED BY FIREBASE AUTH
var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const bcrypt = require('bcrypt');

const authware = require('../middleware/auth');

const Users = require('../graphql/models/user');

router.post('/register', async (req, res) => {
  const userObj = req.body;

  Users.add(userObj)
      .then(res => {
        res.status(201).json({
          status: 'User added to db',
          message: 'User Registered!',
          data: res
        })
      })
      .catch(error => {
        res.status(500).json({
          status: 'User add failure',
          message: 'Failed to add user to DB',
          error: error
        })
      })
})
  

// function registerValidation(user) {
//     const schema = Joi.object().keys({
//       'firstName': Joi.string().required(),
//       'lastName': Joi.string().required(),
//       'email': Joi.string().email().required(),
//       'firebaseId': Joi.string().required(),
//       'picture': Joi.string().required(),
//       'lat': Joi.string().required(),
//       'lon': Joi.string().required()
//     })
  
//     return schema.validate(user)
//   }

module.exports = router;
