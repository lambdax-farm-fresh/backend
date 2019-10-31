var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const User = require('../graphql/models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const users = await User.find();
    
        res.json(users);
        
    } catch (error) {
        res.send(error);
  }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log('route', user)
        res.json(user)
    } catch (error) {
        res.send(error)
    }
})

router.put('/:id', async (req, res) => {
    const user = req.body;

    let { value, error } = userValidation(user);
    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      User.update(req.params.id, user)
          .then(saved => {
          res.status(201).json({
              status: 'user saved',
              message: 'User Saved!',
              data: saved
          });
          })
          .catch(error => {
          res.status(500).json({
              status: 'DB update error',
              message: 'Failed to update changes to DB',
              error: error
          });
        });
      }
} )

router.delete('/:id', async (req, res) => {
    User.deleteUser(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
} )


function userValidation(user) {
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