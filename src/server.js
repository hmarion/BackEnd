const express = require('express');
const cors = require('cors');
const multer = require('multer');
const productosRouter = require('./routes/productos');

const upload = multer();
const app = express();
app.use(upload.single('file'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('public'));
app.use('/api/productos', productosRouter);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en ' + PORT);
});

app.get('/', (req, res)=>{
    res.send('Desafio clase 8');
})
