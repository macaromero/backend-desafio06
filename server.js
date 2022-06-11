const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const claseContenedor = require('./class/classContenedor');
const claseProductos = new claseContenedor;
const claseMensajes = require('./class/classMensajes');
const claseChat = new claseMensajes;
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname, "index.html");
});


io.on('connection', async channel => {
    const getProducts = await claseProductos.getAll();
    const getMessages = await claseChat.getAll();

    channel.emit('tablaProductos', getProducts);
    channel.emit('chat', getMessages);

    channel.on('addProduct', async product => {
        await claseProductos.save(product);
        io.sockets.emit('tablaProductos', getProducts);
    });

    channel.on('addMsj', async msj => {
        await claseChat.save(msj);
        io.sockets.emit('chat', getMessages);
    })

    
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});