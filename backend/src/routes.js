const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const PointsController = require('./controllers/PointsController');
const MobileController = require('./controllers/MobileController');

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/points',upload.single('image_name'), PointsController.store);
routes.post('/pointsmobile',upload.single('image_name'), MobileController.store);
routes.get('/points', PointsController.index);
routes.get('/points/:id', PointsController.show);
 
module.exports = routes;
