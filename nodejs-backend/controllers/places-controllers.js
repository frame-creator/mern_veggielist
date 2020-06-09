const fs = require('fs');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');

const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaces = async (req, res, next ) => {
    let places;
    try {
      places = await Place.find();
  
  
    }  catch (err) {
      const error = new HttpError (
      '장소를 불러오지 못했습니다. 다시 시도해주세요.',
      500
      );
      return next(error);
  
    }
    res.json({places : places.map(place => place.toObject({getters: true}))});
  }

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let place;
    try{
   place = await Place.findById(placeId);
    //.exec();
    } catch (err) {
        const error = new HttpError(
            '장소를 찾을 수 없습니다.', 500
        );
        return next(error);
    }
    
    //const place = DUMMY_PLACES.find(p => {
    //    return p.id === placeId;
    //});
    // console.log('장소에 대한 응답 실행');
    if(!place) {
     // return  res
     // .status(404)
     // .json({message: '해당 아이디의 장소를 찾을 수 없습니다.'})
    
    // const error = new Error('해당 아이디의 장소를 찾을 수 없습니다.');
    //error.code = 404;
    //throw error;
    //throw new
    const error = new HttpError('해당 아이디의 장소를 찾을 수 없습니다.', 404);
    return next(error);
    } 
    
    
    res.json({place : place.toObject({getters: true})});
    };

    const getPlacesByUserId = async (req, res,next) => {
        const userId = req.params.uid;
       // let places;
        let userWithPlaces
    try{
       // places = await Place.find({creator: userId});
        userWithPlaces = await User.findById(userId).populate('places');
        
        //.exe()
        
    } catch(err) {
       const error = new HttpError(
           '장소를 가져오지 못했습니다. 다시 한번 시도해주세요.', 500
       ) ;
       return next(error);
    }

      //  const places = DUMMY_PLACES.filter(p => {
      //      return p.creator === userId;
      //  });
    
      if (!userWithPlaces || userWithPlaces.length === 0 ) {
      //  if(!places || places.length === 0) {
          //  return  res
          //  .status(404)
          //  .json({message: '해당 유저 아이디를 찾을 수 없습니다.'})
        
        //  const error = new Error('해당 유저 아이디를 찾을 수 없습니다.');
        //  error.code = 404;
        //  return next(error);  
    return next(
        new HttpError('해당 유저 아이디를 찾을 수 없습니다.', 404)
    );   
    } 
    res.json({places : userWithPlaces.places.map(place => place.toObject({getter: true}))});
       // res.json({places : places.map(place => place.toObject({getter: true}))});
    };

const createPlace = async (req, res, next) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()) {
    // console.log(errors);
    // res.status(422)
    return next( new HttpError('유효하지 않은 입력값입니다.', 422)
    );
 }
 const { title, description, address} = req.body;
 
 let coordinates;
 try{
  coordinates = await getCoordsForAddress(address);
 } catch (error) {
  return next(error);
 }

const createdPlace = new Place({
   title,
   description,
   address,
   location: coordinates,
   image : req.file.path,
   creator: req.userData.userId

});



// const createdPlace = {
//    id: uuid(),
//     title,
//     description,
//     location: coordinates,
//     address,
//     creator
// };

let user;

try{
    user = await User.findById(req.userData.userId);
 } catch(err) {
     const error = new HttpError(
'장소설정이 되지 않았습니다. 다시 시도해주세요.',500
      ); 
    return next(error);
}
if (!user) {
    const error = new HttpError (
'해당 아이디의 정보를 찾을 수 없습니다. 다시 시도해주세요.', 404

    );
    return next(error);
}

console.log(user);

try {

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({session: sess});
    user.places.push(createdPlace);
    await user.save({session: sess});
    await sess.commitTransaction();


//await createdPlace.save();
} catch (err) {
    const error = new HttpError(
        '장소 설정이 되지 않았습니다. 다시 한번 설정해주세요.',
        500
    );
    return next(error);
}

// DUMMY_PLACES.push(createdPlace);

 res.status(201).json({place : createdPlace});
};

const updatePlace = async (req, res, next) => {
 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       return next(
        new HttpError('유효하지 않은 입력값입니다.', 422)   
       );
      //  throw new HttpError('유효하지 않은 입력값입니다.', 422);
    }


const {title, description} = req.body;
 const placeId = req.params.pid;

let place;
try{
    place = await Place.findById(placeId);
} catch(err) {
    const error = new HttpError(
        '장소를 업데이트 할 수 없습니다.', 500
    );
    return next(error);
}

 //const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
 //const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
 
if (place.creator.toString() !== req.userData.userId) {
  const error = new HttpError(
      '수정 권한이 없습니다.',
      401
  );
  return next(error);
}


 place.title = title;
 place.description = description;

 try{
     await place.save();
 } catch (err) {
     const error = new HttpError(
     '장소를 업데이트 할 수 없습니다.', 500
     );
     return next(error);
 }
 //updatedPlace.title = title;
 //updatedPlace.description = description;

 //DUMMY_PLACES[placeIndex] = updatedPlace;

 //res.status(200).json({place: updatedPlace});
 res.status(200).json({place: place.toObject({getters : true})});
};

const deletePlace = async (req, res, next) => {
 const placeId = req.params.pid;


let place;
try {
    place = await Place.findById(placeId).populate('creator');

} catch (err) {
    const error = new HttpError(
        '장소를 삭제할 수 없습니다.', 500
    );
    return next(error);
}

//if(!DUMMY_PLACES.find(p=> p.id === placeId)) {
//    throw new HttpError('해당 아이디의 장소를 찾을 수 없습니다.',404);
//}

// DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
if(!place) {
    const error = new HttpError(
        '해당 아이디의 장소를 찾을 수 없습니다.', 404
    );
    return next(error);
}
if (place.creator.id !== req.userData.userId ) {
    const error = new HttpError(
        '삭제 권한이 없습니다.',
        401
    );
    return next(error);
}


const imagePath = place.image;

try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({session: sess});
    place.creator.places.pull(place);
    await place.creator.save({session: sess});
    await sess.commitTransaction();
 //  await place.remove();
} catch (err) {
    const error = new HttpError(
        '장소를 삭제할 수 없습니다.', 500
    );
    return next(error);
}

fs.unlink(imagePath, error => {

});

res.status(200).json({message: '장소가 삭제되었습니다.'} );

};

exports.getPlaces = getPlaces;
  exports.getPlaceById = getPlaceById;
  exports.getPlacesByUserId = getPlacesByUserId;
  exports.createPlace = createPlace;
  exports.updatePlace = updatePlace;
  exports.deletePlace = deletePlace;