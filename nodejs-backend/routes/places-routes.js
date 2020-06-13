const express = require('express');
// const HttpError = require('../model/http-error');
const { check } = require('express-validator');


const placesControllers = require('../controllers/places-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/', placesControllers.getPlaces);
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid',placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
'/new',
fileUpload.single('image'),
[
check('title').not().isEmpty(),
check('description').isLength({min: 5}),
check('address').not().isEmpty(),
],

placesControllers.createPlace
);

router.patch('/:pid',[
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
],
 placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace );

module.exports = router;