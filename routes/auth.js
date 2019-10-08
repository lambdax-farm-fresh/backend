// WILL BE UPDATED / REPLACED BY FIREBASE AUTH
var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const bcrypt = require('bcrypt');

const Users = require('../models/user');

router.post('/register', async (req, res) => {
    const user = req.body;

    let { value, error } = registerValidation(user);

    if (error) { 
      res.status(422).json({
        status: 'error',
        message: 'Data validation failed. Check inputs.',
        error: error.details
    })} else {

    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash;

    Users.add(user)
        .then(saved => {
        res.status(201).json({
            status: 'user saved',
            message: 'User registered!',
            data: saved
        });
        })
        .catch(error => {
        res.status(500).json({
            status: 'DB add error',
            message: 'Failed to add to DB',
            error: error
        });
      });
    }
});
  
router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = authware.generateToken(user); // new
          if(token){
          res.status(200).json({
            curid: user.id,
            curusername: user.username,
            token
          });
        } else {
            res.status(500).json({ msg: 'Could not generate token'});
        }
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error, {message: "OOP"});
      });
});


function registerValidation(user) {
    const schema = Joi.object().keys({
      'firstName': Joi.string().required(),
      'lastName': Joi.string().required(),
      'email': Joi.string().email().required(),
      'firebaseId': Joi.string().required(),
      'picture': Joi.string().required(),
      'lat': Joi.string().required(),
      'lon': Joi.string().required()
    })
  
    return schema.validate(user)
  }

module.exports = router;
