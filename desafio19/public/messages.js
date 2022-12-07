const socket = io().connect()

// Render de Chat

const renderMsgs = (data) => {
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
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let text = document.getElementById('text').value
    let avatar = document.getElementById('avatar').value
    const chatMsg = {author:{id: email, alias: name, avatar: avatar}, text: text}
    if(chatMsg.author.id && chatMsg.author.alias && chatMsg.author.avatar && chatMsg.text){
        socket.emit('add-msg', chatMsg)
        return false
    }
    else{
        alert('Complete los datos requeridos')
    }
  }