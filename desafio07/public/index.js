const socket = io().connect()

// Render de Producto

const render = (data) => {
    const listadoProductos = document.querySelector('#products')
    const html = data.map(product =>    `<div class="col">
                                            <div class="card shadow-sm bg-black">
                                            <img src=${product.thumbnail} alt="" class="bd-placeholder-img card-img-top productIMG" width="100%" height="225">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between align-items-center">
                                                <small class="h6">ID: ${product.id}</small>
                                                </div>
                                                <h5 class="card-text fs-5">${product.title}</h5>
                                                <p class="card-text h5">Precio: ${product.price} U$S</p>
                                            </div>
                                            </div>
                                        </div>`)
    listadoProductos.innerHTML = html
}

socket.on('message-server', data => {
    render(data.products)
})

const addProduct = (e) => {   
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    const product = {
        title,
        price,
        thumbnail
    }
    if(product.title && product.price && product.thumbnail){
        socket.emit('add-product', product)
        return false
    }
    else{
        alert('Complete los datos requeridos: Titulo, Precio y URL de imagen')
    }
}

// Render de Chat

const renderMsgs = (data) => {
    let chatcontainer = document.querySelector('#chat-container')
    let html = data.map(msg => `<li class="p-3">
      <strong style='color:blue'> ${msg.from} </strong>
      <em style='color:brown'> ${msg.date} : </em>
      <p class="fst-italic" style='color:green'>${msg.text}</p> 
      </li> `)
    chatcontainer.innerHTML = html
  }

socket.on('arrMsg', data => {
    renderMsgs(data.chat)
  } )
  
  const addMessage = (e) => {
    let email = document.getElementById('email').value
    let text = document.getElementById('text').value
    const chatMsg = {from:email, text}
    if(chatMsg.from && chatMsg.text){
        socket.emit('add-msg', chatMsg)
        return false
    }
    else{
        alert('Complete los datos requeridos: Email y Mensaje')
    }
  }