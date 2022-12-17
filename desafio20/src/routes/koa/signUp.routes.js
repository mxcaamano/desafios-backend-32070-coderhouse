const Router = require('koa-router');

const { getSignUp, getFailsignUp } = require('../../controllers/koa/signUp.controller');
const userModel = require('../../models/user.model');
const { createHash } = require('../../utils/bcrypt.config');
const { userMiddleware } = require('../../middlewares/middlewaresKoa.js');
const upload = require('../../middlewares/uploadMiddleware');
const Resize = require('../../utils/resize');

//nodemailer
const mail = process.env.TEST_MAIL
const transporter = require('../../utils/nodemailer.config');

const router = new Router();

router.get('/signUp', getSignUp);
router.post('/signUp', upload.single('image'), userMiddleware, async function (ctx) {    
    const { email, password, name, address, age, phone } = ctx.request.body;
    try {
    const imagePath = './public/uploads/avatars'
    const fileUpload = new Resize(imagePath);
    if (!ctx.request.file) {
    // res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(ctx.request.file.buffer);
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
    ctx.redirect('/login');
    } catch (err) {
    ctx.body = { message: err.message }
    // res.status(400).json({ message: err.message });
    }
});
router.get('/signUp/error', getFailsignUp);

module.exports = router;