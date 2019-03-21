const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//importing the User model 
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Registers users
// @access  Public
router.post('/register', (req, res) => {
    const {name , email, password} = req.body;
    User.findOne({email})
    .then(user => {
        if(user){
            return(res.status(400).json({email:'Email already exists'}));
        }else{
            const newUser = new User({
                name,
                email,
                password
            });
            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            });
        }
    })

});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
// router.post('/register', parser.single("image"), (req, res) => {
   
// });


module.exports = router;