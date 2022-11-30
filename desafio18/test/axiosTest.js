const axios = require('axios');

async function axiosTest(){
    try {
        let product = {
            title: "Producto para test desde axios",
            price: 211,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis corporis inventore maxime tempore ipsum magnam, asperiores molestias sed quisquam laboriosam nobis pariatur, placeat consequatur labore reprehenderit fugiat voluptates autem sunt.",
            thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_925228-MLA49727654203_042022-F.webp",
            code: "1399921",
            stock: 12
        };

        console.log('Testing CRUD endpoints...');

        const addProduct = await axios.post('http://localhost:8080/productos',product);
        console.log('[1/5] POST Method - Endpoint: /productos');
        console.log(addProduct.data);

        const getProducts = await axios.get('http://localhost:8080/productos');
        console.log('[2/5] GET Method - Endpoint: /productos');
        console.log(getProducts.data);

        const getProductById = await axios.get('http://localhost:8080/productos/'+addProduct.data._id);
        console.log('[3/5] GET Method - Endpoint: /productos/:id');
        console.log(getProductById.data);

        const updateProduct = await axios.put('http://localhost:8080/productos/'+addProduct.data._id,
        {...addProduct.data,
        description: "Descripcion modificada con axios", 
        stock: 99});
        console.log('[4/5] PUT Method - Endpoint: /productos/:id');
        console.log(updateProduct.config.data);
    
        const deleteProduct = await axios.delete('http://localhost:8080/productos/'+addProduct.data._id);
        console.log('[5/5] DELETE Method - Endpoint: /productos/:id');
        console.log(deleteProduct.data);

    } catch (error) {
        console.log('Error: ', error.message);
    }
};

axiosTest();