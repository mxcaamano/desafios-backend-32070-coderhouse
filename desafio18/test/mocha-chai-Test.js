const supertest = require('supertest')
const { expect } = require('chai');

let product = {
    title: "Producto temporal para test con mocha-chai",
    price: 211,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis corporis inventore maxime tempore ipsum magnam, asperiores molestias sed quisquam laboriosam nobis pariatur, placeat consequatur labore reprehenderit fugiat voluptates autem sunt.",
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_925228-MLA49727654203_042022-F.webp",
    code: "1399921",
    stock: 12
}

const fake_id = "6387a1ba252b1683d1lpma27"

describe('test de productos',()=>{

    before(function(){
        console.log('Test Starting');
        request = supertest('http://localhost:8080');
    })

    after(function(){
        console.log('Test Ending');
    })
    
    describe('POST /productos',()=>{
        it('Añadir un producto', async()=>{
            const response = await request.post('/productos').send(product);
            expect(response.status).to.eql(200);
            return _id = response.body._id;
        });

        it('Comprobación de campos ingresados', async()=>{
            const response = await request.get('/productos/'+_id);
            expect(response.body.title).to.eql(product.title);
            expect(response.body.price).to.eql(parseFloat(product.price));
            expect(response.body.description).to.eql(product.description);
            expect(response.body.thumbnail).to.eql(product.thumbnail);
            expect(response.body.code).to.eql(product.code);
            expect(response.body.stock).to.eql(parseInt(product.stock));
        });

        it('Retorno de mensaje: "Campos incompletos o incorrectos" ', async()=>{
            const response = await request.post('/productos').send({...product, title:'', stock:'25'});
            expect(response.status).to.eql(400);
            expect(response.body).deep.eql({ error: 'Campos incompletos o incorrectos' });
        });
    })

    describe('GET /productos',()=>{
        it('Retornar los productos de la DB', async()=>{
            const response = await request.get('/productos');
            expect(response.status).to.eql(200);
        });
    })


    describe('GET /productos/:id',()=>{
        it('Retornar el producto específico de la DB', async()=>{
            const response = await request.get('/productos/'+_id);
            expect(response.status).to.eql(200);
        });

        it('Retornar "No se encuentra el producto" ', async()=>{
            const response = await request.get('/productos/'+fake_id);
            expect(response.status).to.eql(400);
            expect(response.body).to.eql({ error: 'No se encuentra el producto' });
        });
    })

    describe('PUT /productos/:id',()=>{

        it('Modificar el titulo del producto', async()=>{
            const response = await request.put('/productos/'+_id).send({...product, title: 'Producto temporal para test con mocha-chai - PUT' });
            expect(response.status).to.eql(200);
        });

        it('Retorno de mensaje: "Campos incompletos o incorrectos"', async()=>{
            const response = await request.put('/productos/'+_id).send({...product, title:'', stock:'25'});
            expect(response.status).to.eql(400);
            expect(response.body).deep.eql({ error: 'Campos incompletos o incorrectos' });
        });
        
    })

    describe('DELETE /productos/:id',()=>{
        it('Eliminar el producto', async()=>{
            const response = await request.delete('/productos/'+_id);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({message: 'Producto eliminado'});
        });

        it('Retorno de mensaje: "El producto no existe"', async()=>{
            const response = await request.delete('/productos/'+fake_id);
            expect(response.status).to.eql(400);
            expect(response.body).to.eql({error: 'El producto no existe'});
        });
    })
})