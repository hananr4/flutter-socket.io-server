const {io} = require('../index');
// Mensajes de sockets
io.on('connection', client => {
    console.log(`Cliente conectado ${client.id}`);
    console.log(client.id);

    client.on('disconnect', () => { 
        console.log(`Cliente desconectado ${client.id}`);
     });


    client.on('mensaje', function (payLoad) {
        console.log(payLoad);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

  });
