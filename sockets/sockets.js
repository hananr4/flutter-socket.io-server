const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
//console.log('init server');

bands.addBand(new Band('Don Medardo'));
bands.addBand(new Band('The Beatles'));
bands.addBand(new Band('Menudo'));
bands.addBand(new Band('Doors'));
bands.addBand(new Band('Queen'));

//console.log(bands);

// Mensajes de sockets
io.on('connection', client => {
    console.log(`Cliente conectado ${client.id}`);

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log(`Cliente desconectado ${client.id}`);
     });


    client.on('mensaje', function (payLoad) {
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });


    client.on('vote-band', function (payLoad) {
        bands.voteBand(payLoad.id);
        io.emit('active-bands', bands.getBands()); 
    });
    
    client.on('add-band', function (payLoad) {
        bands.addBand(new Band(payLoad.name));
        io.emit('active-bands', bands.getBands()); 
    });
    
    client.on('delete-band', function (payLoad) {
        bands.deleteBand(payLoad.id);
        io.emit('active-bands', bands.getBands()); 
    });
    


    // client.on('emitir-mensaje', (payload) => {
    //     //io.emit('nuevo-mensaje', payload); // emite a todos!!
    //     console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos el que lo emitió
    // });

  });
