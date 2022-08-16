const socket = io().connect()

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

// function add product from form
const addProduct = (e) => {   
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    const product = {
        title,
        price,
        thumbnail
    }
    console.log(product)
    socket.emit('add-product', product)
    return false
}

// const renderMsg = (data) => {
//     let container = document.getElementById('chat-container')
//     let html = data.map(el => `<li>
//       <em> ${el.date} </em>
//       <strong style='color:blue'> ${el.from}: </strong>
//       <p style='color:brown'>${el.text}</p> 
//       </li> `)
//     container.innerHTML = html
//   }

// socket.on('arrMsg', data => {
//     renderMsg(data.chats)
//   } )
  
//   const addMessage = (e) => {
//     let email = document.getElementById('email').value
//     let text = document.getElementById('text').value
//     const chatMsg = {from:email, text}
//     console.log(chatMsg)
//     socket.emit('add-msg', chatMsg)
//     return false
//   }