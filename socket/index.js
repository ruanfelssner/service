const { decodeString } = require('./modules/decode');
const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.on('data', (data) => {
      try{
      if(data){
        new Error('Data is empty')
      }
      const decodedCode = decodeString(data)
      const connectDB = require('./config/database');
      const {Car, CarHistory} = require('./models/Car');

      console.log(decodedCode)

        connectDB().then(async() => {
          const car = await Car.findOne({ imei: decodedCode.imei })
          if(car){
            const newCarHistory = new CarHistory({ carId: car.id, latLng: decodedCode.latLng });
            await newCarHistory.save();
            console.log("Localização do carro cadastrada com sucesso")
          }
          else{
            console.log("Erro ao cadastrar localização do carro")
          }
        }).catch((err) => {
          console.log('Erro ao conectar ao MongoDB:', err);
        });

      console.log('--------- decode end --------- ')
      }
      catch(e){
        console.log(e)
      }
    })
    socket.on('end', () => {
      console.log('Client disconnected');
    })
  })

server.listen(8383, () => {
    console.log(`Socket listening on port ${8383}`);
})
