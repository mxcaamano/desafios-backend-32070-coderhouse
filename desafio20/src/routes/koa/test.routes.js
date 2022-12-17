const Router = require('koa-router');

const router = new Router({
    prefix: '/productos'
})

let db = [{id: 1, title: "Producto 1", price: 45}, {id: 2, title: "Producto 2", price: 105}]

router.get('/', ctx => {
    let data = db;
    ctx.body = {
        stauts: 'sucess',
        data
    }
})



module.exports = router;