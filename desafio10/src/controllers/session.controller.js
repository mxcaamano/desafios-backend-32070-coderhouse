const login = async (req, res) => {
    try {
    //   const username = req.session.username;
      res.redirect('/api/mensajes');
    //   res.status(200).json({message: `welcome ${username}`, logout: 'METHOD DELETE localhost:5000/logout'})
    } catch(error){
      res.status(400).json({message: error})
    }
  }

const postLogin = async (req, res) => {
    const { username } = req.body;
    try {
      if(username){
        req.session.username = username;
        req.session.admin = true;
        res.redirect('/api/mensajes');
        // return res.status(200).json({message: `welcome ${username}`, logout: 'METHOD DELETE localhost:5000/logout'})
      }
    } catch(error){
      res.status(400).json({message: error})
    }
  }
  
const logout = async (req, res) => {
    const username = req.session.username;
    try {
      req.session.destroy(error => {
        if(error){
          return res.status(500).json({
            success: false,
            message: 'no se pudo cerrar sesion'
          })
        }
        return res.status(200).json({
          message: `Se cerró la sesion de ${username}`
        })
      })
    } catch(error){
      res.status(500).json({message: error})
    }
  }

module.exports = { postLogin, login, logout }