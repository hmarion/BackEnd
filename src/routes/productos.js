const express = require('express');
const router = express.Router();
const contenedor = require('../classes/contenedor');

const productos = new contenedor();


//GETS
router.get('/', (req, res)=>{
    productos.getAll().then(result => {
        res.send(result.message);
    });
});

router.get('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    productos.getById(num).then(result => {
        res.send(result.message);
    })
});

//POSTS
router.post('/', (req, res)=>{
    let producto = req.body;
    productos.save(producto).then(result =>{
        res.send(result.message);
    })
})

//PUTS
router.put('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    let producto = req.body;
    productos.updateById(num, producto).then(result => {
        res.send(result.message);
    })
})

//DELETES
router.delete('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    productos.deleteById(num).then(result => {
        res.send(result.message);
    })
});

router.delete('/', (req, res)=>{
    productos.deleteAll().then(result => {
        res.send(result.message);
    })
});

module.exports = router;