const authMiddleware = async (req, res, next) => {
    const { username, admin } = req.session;
    if(username == 'Martin' && admin){
      return next()
    }
    // return res.status(400).send(`<h1>Usuario no autenticado</h1>`)
    return res.render('pages/login');
  };
  
  module.exports = authMiddleware;
  