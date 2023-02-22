const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('messageLogged', function(){
    console.log('Listerner called')
})

emitter.emit('messageLogged', {id: 1, url: "http://"})