var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const Farms = require('../graphql/models/farm');

router.get('/:id', async function(req, res, next) {
    try {
        const farms = await Farms.findById(req.params.id);
    
        res.json(farms);
        
    } catch (error) {
        res.send(error);
  }
});

/* GET farms listing. */
router.get('/', async function(req, res, next) {
    try {
        const farms = await Farms.find();
    
        res.json(farms);
        
    } catch (error) {
        res.send(error);
  }
});

router.post('/', async (req, res) => {
    const farm = req.body;

    let { value, error } = farmValidation(farm);

    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Farms.add(farm)
          .then(saved => {
          res.status(201).json({
              status: 'farm saved',
              message: 'Farm Saved!',
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
} )

router.put('/:id', async (req, res) => {
    const farm = req.body;

    let { value, error } = farmValidation(farm);
    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Farms.update(req.params.id, farm)
          .then(saved => {
          res.status(201).json({
              status: 'farm saved',
              message: 'Farm Saved!',
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
    Farms.deleteFarm(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
} )


function farmValidation(farm) {
    const schema = Joi.object().keys({
      'farmName': Joi.string().required(),
      'userId': Joi.number().integer().positive().required()
    })
  
    return schema.validate(farm)
  }

module.exports = router;