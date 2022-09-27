const login = async (req, res) => {
    try {
    //   const username = req.session.username;
    //   res.status(200).json({ message: `Bienvenido ${username}` })
    res.redirect('/api/mensajes');
    } catch(error){
      res.status(400).json({error: error.message})
    }
  }

const postLogin = async (req, res) => {
    const { username } = req.body;
    try {
      if(username){
        req.session.username = username;
        req.session.admin = true;
        res.redirect('/api/mensajes');
        // return res.status(200).json({ message: `Bienvenido ${username}`})
      }
    } catch(error){
      res.status(400).json({error: error.message})
    }
  }
  
const logout = async (req, res) => {
    const username = req.session.username;
    try {
      req.session.destroy(error => {
        if(error){
          return res.status(500).json({
            message: 'No es posible cerrar sesión',
            error: error.message
          })
        }
        res.redirect('/login');
        // return res.status(200).json({ message: `Se sesion de ${username} cerrada` })
      })
    } catch(error){
      res.status(500).json({error: error.message})
    }
  }

module.exports = { postLogin, login, logout }