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

        it('deberia añadir un producto', async()=>{
            const response = await request.post('/productos').send(product);
            expect(response.status).to.eql(200);
            return _id = response.body._id;
        });
    })

    describe('GET /productos',()=>{
        it('deberia retornar los productos en la DB', async()=>{
            const response = await request.get('/productos');
            expect(response.status).to.eql(200);
        });
    })


    describe('GET /productos/:id',()=>{
        it('deberia retornar el producto de la DB', async()=>{
            const response = await request.get('/productos/'+_id);
            expect(response.status).to.eql(200);
        });
    })

    describe('DELETE /productos/:id',()=>{

        it('deberia eliminar el producto', async()=>{
            const response = await request.delete('/productos/'+_id);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({message: 'Producto eliminado'});
        });

        it('deberia devolver el error: "El producto no existe"', async()=>{
            const response = await request.delete('/productos/'+fake_id);
            expect(response.status).to.eql(400);
            expect(response.body).to.eql({error: 'El producto no existe'});
        });

    })
})