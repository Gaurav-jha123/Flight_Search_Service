const express = require('express');

const cityController = require('../../controllers/city-controller');

const router = express.Router();

router.post('/city' , cityController.create);  // i.e /v1/city
router.delete('/city/:id' , cityController.destroy);  // i.e /v1/city  // same way in postman
router.get('/city/:id', cityController.get);
router.patch('/city/:id',cityController.update);




module.exports = router;