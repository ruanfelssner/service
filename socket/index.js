const { decodeString } = require('./modules/decode');
const net = require('net');
const db = require('./config/database');

const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.on('data', (data) => {
      try{
        console.log('--------- decode start --------- ')
      console.log(decodeString(data))
      console.log('--------- decode end --------- ')
      }
      catch(e){
        console.log('--------- decode error --------- ')
        console.log(e)
        console.log('--------- decode error --------- ')
      }
    })
    socket.on('end', () => {
      console.log('Client disconnected');
    })
  })

server.listen(8383, () => {
    console.log(`Socket listening on port ${8383}`);
})
