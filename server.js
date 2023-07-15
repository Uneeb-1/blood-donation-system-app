let myExpress = require('express');
let myApp = myExpress();
myApp.use(myExpress.json());
let User = require('./models/User');
require('./models/db');
const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD} = require('../src/screens/env/env');
const Mailgen = require('mailgen');
const { default: axios } = require('axios');
// const { json } = require('react-router-native');

myApp.post('/singup', async function (req, resp) {
  let neyaUser = new User(req.body);
  await neyaUser.save();
  resp.end('user add ho gya');
});

myApp.post('/login', async function (req, resp) {
  let userMillGya = await User.findOne({userEmail: req.body.userEmail,userPassword: req.body.userPassword,});
  if (userMillGya) {
    resp.json(userMillGya);
  }
});

myApp.get('/all_users', async function (req, resp) {
  let all_Users = await User.find();
  resp.json(all_Users);
});

myApp.post('/currentUserDetails', async function (req, resp) {
  try {
    const currentUser = await User.findByIdAndUpdate(req.body.currentId, {
      date: req.body.date,
    });
    // if (currentUser) {
    // resp.json(currentUser)
    resp.json({
      success: true,
    });
    // }
  } catch (e) {
    resp.status(500).json(e);
  }
});



myApp.post('/forgotpassword',async function (req, res) {
  console.log(req.body);

  const userEmail = req.body.email;
  const user = await User.findOne({userEmail});
  user.verifyToken = req.body.verifyToken;
  await user.save();
  res.json(user)


  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rehanmian200@gmail.com', // Your email address
      pass: 'rwnahklmerqamllf', // Your email password or app-specific password
    },
  });

  // Prepare the email message
  const mailOptions = {
    from: 'rehanmian200@gmail.com',
    to: req.body.email,
    subject: 'Email Verification',
    text: `Your email verification code is ${req.body.verifyToken} .`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    // res.json({message: 'Email sent successfully'});
  } catch (error) {
    console.error('Error sending email:', error);
    // res.status(500).json({error: 'Failed to send email'});
  }
});

myApp.post('/verifyTokenCheck',async function(req,resp){

  const verifyToken = req.body.firstNumer
  let findedUser = await User.findOne({verifyToken});
  if(findedUser){
    resp.json({
      success:true
    })
  }else{
    resp.json({
      success:false
    })
  }

});

myApp.post('/setnewpassword', async function (req, resp) {
  try {
    const verifyToken = req.body.currentToken.firstNumer;
    const currentUser = await User.findOne({ verifyToken });

    if (!currentUser) {
      return resp.status(404).json({ success: false, message: 'User not found' });
    }

    currentUser.userPassword = req.body.pass;
    await currentUser.save();
    console.log(currentUser);

    console.log(currentUser);
    resp.json({ success: true });
  } catch (error) {
    resp.status(500).json({ success: false, error: error.message });
  }
});

// myApp.post('/setnewpassword',async function(req,resp) {
//   const verifyToken = req.body.currentToken.firstNumer;
//   const currentUser = await User.findOne({verifyToken});
//   currentUser.userPassword == req.body.pass
//   await currentUser.save()
//   console.log(currentUser);
//   resp.json({
//     success:true
//   })
// })

myApp.get('/all_users',async function(req,resp){
  const all_Users = await User.find();
  console.log(all_Users);
  resp.json(all_Users)
})

myApp.listen(3005, function () {
  console.log('server is challing');
});
