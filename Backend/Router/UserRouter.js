const express  = require('express');
const { singupUser, loginUser, userController } = require('../Controller/auth-controller');
// const { getUser } = require('../Controller/user-controller');
const { authMiddleware } = require('../middleware/auth-MiddelWare');

const router = express.Router();

router.post('/singup' , singupUser).post('/login' ,loginUser).get('/user',authMiddleware ,userController).get('/myData',(req,res)=>{
    res.status(200).json({msg:"Hiiiiiiii"})
})

exports.router = router;