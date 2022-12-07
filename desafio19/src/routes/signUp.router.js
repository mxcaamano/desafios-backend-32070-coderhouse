const Router = require('express');
const { getSignUp, getFailsignUp } = require('../controllers/signUp.controller');
const userModel = require('../models/user.model');
const { createHash } = require('../utils/bcrypt.config');
const { userMiddleware } = require('../middlewares/middlewares.js');
const upload = require('../middlewares/uploadMiddleware');
const Resize = require('../utils/resize');
// const path = require('path');

//nodemailer
const mail = process.env.TEST_MAIL
const transporter = require('../utils/nodemailer.config');

const routerSignUp = Router();

routerSignUp.get('/', getSignUp);
routerSignUp.post('/', upload.single('image'), userMiddleware, async function (req, res) {    
    const { email, password, name, address, age, phone } = req.body;
    try {
    const imagePath = './public/uploads/avatars'
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    // return res.status(200).json({ name: filename });
    const user = { email, password: createHash(password), name, address, age, phone, imgURL: imagePath.slice(8) + '/' + filename };
    const User = new userModel(user);
    await User.save();
    const mailOptions =  {
      from: `${user.email}`,
      to: mail,
      subject: `Nuevo registro`,
      html: `<div style="background-color:black;"><br>
              <h1 style="color: #2bf8bb;">&nbsp&nbsp&nbsp Nuevo Registro!</h1><br>
              <h2 style="color: #2bf8bb;">&nbsp&nbsp&nbspSe ha registrado un nuevo usuario con los siguientes datos:</h2><br>
              <ul>
              <li style="color: #4eaa93;">Nombre: ${user.name}</li>
              <li style="color: #4eaa93;">Correo Electrónico: ${user.email}</li>
              <li style="color: #4eaa93;">Dirección: ${user.address}</li>
              <li style="color: #4eaa93;">Edad: ${user.age}</li>
              <li style="color: #4eaa93;">Teléfono: ${user.phone}</li><br>
              </ul><br>
              </div><br>`
            }
    await transporter.sendMail(mailOptions)
    res.redirect('/login');
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});
// routerSignUp.post('/', userMiddleware, postSignUp);
routerSignUp.get('/error', getFailsignUp);

module.exports = routerSignUp;