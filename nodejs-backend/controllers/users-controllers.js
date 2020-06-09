//const uuid = require('uuid/v4');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-errors');
const User = require('../models/user');

//const DUMMY_USERS = [
//{
//  id: 'u1',
//  name: '이달력',
//  email : 'test@test.com',
//  password: 'testers'
//
//}
//];

const getUsers = async (req, res, next) => {
let users;
try{    
users = await User.find({}, '-password');
// res.json({ users: DUMMY_USERS });
} catch (err) {
const error = new HttpError(
    '정보를 가져오지 못했습니다. 다시 시도해주세요.', 500
);
return next(error);
}
res.json({users : users.map(user => user.toObject({getters: true}) )});
};


const signup = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
        new HttpError('유효하지 않은 입력값입니다.', 422)
       // throw new HttpError('유효하지 않은 입력값입니다.', 422);
        );
    }


    const {name, email, password } = req.body;

let existingUser;
    try{
existingUser = await User.findOne({ email: email})
} catch (err) {
    const error = new HttpError(
        '회원가입이 되지 않았습니다. 다시 시도해주세요.',500
    );
    return next(error);
}

if (existingUser) {
    const error = new HttpError(
        '이미 존재하는 정보입니다. 로그인해 주세요.',
        422
    );
    return next(error);
}

//const hasUser = DUMMY_USERS.find(u => u.email === email);
//if (hasUser) {
//    throw new HttpError('이미 존재하는 이메일입니다.', 422);
//}

//const createdUser = {
//    id: uuid(),
//    name,
//    email,
//    password
//};

let hashedPassword;
try {
   hashedPassword = await bcrypt.hash(password, 12);
} catch (err ) {
 const error = new HttpError(
     '회원가입이 되지 않았습니다. 다시 시도해주세요.',
     500
 );
}

const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password : hashedPassword,
    places: []
});


try {
    await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            '회원가입이 되지 않았습니다. 다시 한번 시도해주세요.',
            500
        );
        return next(error);
    }

let token;
try{
token = jwt.sign(
{ userId : createdUser.id, 
    email: createdUser.email}, 
'supersecret_dont_share', 
{expiresIn : '1h'}
);
} catch (err) {
    const error = new HttpError(
        '회원가입이 되지 않았습니다. 다시 한번 시도해주세요.',
        500
    );
    return next(error);
}
//DUMMY_USERS.push(createdUser);

res.status(201).
json({userId : createdUser.id, email: createdUser.email, token: token });

};





const login = async (req, res, next) => {
const { email, password} = req.body;

let existingUser;
    try{
 existingUser = await User.findOne({ email: email})
} catch (err) {
    const error = new HttpError(
        '로그인이 되지 않았습니다. 다시 시도해주세요.',500
    );
    return next(error);
}

if (!existingUser ) {
    const error = new HttpError(
        '유효하지 않은 정보입니다. 다시 로그인해주세요.',
        401
    );
    return next(error);
}


let isValidPassword = false;
try {
isValidPassword = await bcrypt.compare(password, existingUser.password);
} catch (error) {
    const error = new HttpError(
        '로그인이 되지 않았습니다. 유효한 정보인지 확인 후 다시 시도해주세요.',
        500
    );
    return next(error);

}

if (!isValidPassword) {
    const error = new HttpError(
        '유효하지 않은 정보입니다. 다시 로그인해주세요.',
        401
    );
    return next(error);    
}
i

//const identifiedUser = DUMMY_USERS.find(u => u.email === email);
//if (!identifiedUser || identifiedUser.password !== password) {
//    throw new HttpError('유저가 확인되지 않습니다.', 401)
//}

let token;
try{
token = jwt.sign(
{userId : existingUser.id, email: existingUser.email}, 
'supersecret_dont_share', 
{expiresIn : '1h'}
);
} catch (err) {
    const error = new HttpError(
        '로그인이 되지 않았습니다. 다시 한번 시도해주세요.',
        500
    );
    return next(error);
}


res.json({
userId: existingUser.id,
email: existingUser.email,
token: token
});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;