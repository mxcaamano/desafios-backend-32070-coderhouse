const socket = io().connect()

// Render de Chat

const renderMsgs = (data) => {
    console.log(data)
    let chatcontainer = document.querySelector('#chat-container')
    let html = data.map(msg => `<li class="p-2">
      <img src="${msg.author.avatar}" alt="" width="50" height="50">
      <strong style='color:blue'> ${msg.author.alias} </strong>
      <em style='color:brown'> (${msg.author.id}) : </em>
      <p class="fst-italic m-2" style='color:green'>${msg.text}</p> 
      </li>`)
    chatcontainer.innerHTML = html
  }

socket.on('arrMsg', data => {
    renderMsgs(data.chat)
  })
  
  const addMessage = (e) => {
    let email = document.getElementById('email').value
    let alias = document.getElementById('alias').value
    let avatar = document.getElementById('avatar').value
    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value
    let edad = document.getElementById('edad').value
    let text = document.getElementById('text').value
    const chatMsg = {author:{id: email, nombre: nombre, apellido: apellido, edad: edad, alias: alias, avatar: avatar}, text: text}
    console.log(chatMsg.text)
    if(chatMsg.author.id && chatMsg.author.alias && chatMsg.author.avatar && chatMsg.author.nombre && chatMsg.author.apellido && chatMsg.author.edad && chatMsg.text){
        socket.emit('add-msg', chatMsg)
        return false
    }
    else{
        alert('Complete los datos requeridos')
    }
  }