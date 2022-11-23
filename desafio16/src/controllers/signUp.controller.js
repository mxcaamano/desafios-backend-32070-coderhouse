// const userModel = require('../models/user.model');
// const { createHash } = require('../utils/bcrypt.config');
const logger = require('../utils/logger');

//nodemailer
// const mail = process.env.TEST_MAIL;
// const transporter = require('../utils/nodemailer.config');

const getSignUp = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/signUp');
};

// const postSignUp = async (req, res) => {
//   const { email, password, name, address, age, phone, imgURL } = req.body;
//   try {
//     const user = { email, password: createHash(password), name, address, age, phone, imgURL };
//     const User = new userModel(user);
//     await User.save();
//     const mailOptions =  {
//       from: `${user.email}`,
//       to: mail,
//       subject: `Nuevo registro`,
//       html: `<div style="background-color:black;"><br>
//               <h1 style="color: #2bf8bb;">&nbsp&nbsp&nbsp Nuevo Registro!</h1><br>
//               <h2 style="color: #2bf8bb;">&nbsp&nbsp&nbspSe ha registrado un nuevo usuario con los siguientes datos:</h2><br>
//               <ul>
//               <li style="color: #4eaa93;">Nombre: ${user.name}</li>
//               <li style="color: #4eaa93;">Correo Electrónico: ${user.email}</li>
//               <li style="color: #4eaa93;">Dirección: ${user.address}</li>
//               <li style="color: #4eaa93;">Edad: ${user.age}</li>
//               <li style="color: #4eaa93;">Teléfono: ${user.phone}</li><br>
//               </ul><br>
//               </div><br>`
//             }
//     await transporter.sendMail(mailOptions)
//     res.redirect('/login');
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const getFailsignUp = (req, res) => {
  res.render('pages/signUpError')
}

module.exports = { getSignUp, getFailsignUp };