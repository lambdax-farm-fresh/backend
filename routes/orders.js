var express = require('express');
var router = express.Router();

const Joi = require('@hapi/joi');

const Orders = require('../models/Order');

router.get('/:id', async function(req, res, next) {
    try {
        const Orders = await Orders.findById(req.params.id);
    
        res.json(Orders);
        
    } catch (error) {
        res.send(error);
  }
});

/* GET Orders listing. */
router.get('/', async function(req, res, next) {
    try {
        const Orders = await Orders.find();
    
        res.json(Orders);
        
    } catch (error) {
        res.send(error);
  }
});

router.post('/', async (req, res) => {
    const Order = req.body;

    let { value, error } = OrderValidation(Order);

    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Orders.add(Order)
          .then(saved => {
          res.status(201).json({
              status: 'Order saved',
              message: 'Order Saved!',
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
    const Order = req.body;

    let { value, error } = OrderValidation(Order);
    if (error) { 
        res.status(422).json({
          status: 'error',
          message: 'Data validation failed. Check inputs.',
          error: error.details
      })} else {
  
      Orders.update(req.params.id, Order)
          .then(saved => {
          res.status(201).json({
              status: 'Order saved',
              message: 'Order Saved!',
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
    Orders.deleteOrder(req.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
} )


function OrderValidation(Order) {
    const schema = Joi.object().keys({
      'OrderName': Joi.string().required(),
      'userId': Joi.number().integer().positive().required()
    })
  
    return schema.validate(Order)
  }

module.exports = router;