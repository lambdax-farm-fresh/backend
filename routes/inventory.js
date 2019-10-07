var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const Inventories = require('../models/inventory');

router.get('/:id', async function(req, res, next) {
    try {
        const inventories = await Inventories.findById(req.params.id);
    
        res.json(inventories);
        
    } catch (error) {
        res.send(error);
  }
});

/* GET inventories listing. */
router.get('/', async function(req, res, next) {
    try {
        const inventories = await Inventories.find();
    
        res.json(inventories);
        
    } catch (error) {
        res.send(error);
  }
});

router.post('/', async (req, res) => {
    const inventory = req.body;

    let { value, error } = inventoryValidation(inventory);

    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Inventories.add(inventory)
          .then(saved => {
          res.status(201).json({
              status: 'inventory saved',
              message: 'Inventory Saved!',
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
    const inventory = req.body;

    let { value, error } = inventoryValidation(inventory);
    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Inventories.update(req.params.id, inventory)
          .then(saved => {
          res.status(201).json({
              status: 'inventory saved',
              message: 'Inventory Saved!',
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
    Inventories.deleteInventory(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
} )


function inventoryValidation(inventory) {
    const schema = Joi.object().keys({
      'inventoryName': Joi.string().required(),
      'userId': Joi.number().integer().positive().required()
    })
  
    return schema.validate(inventory)
  }

module.exports = router;