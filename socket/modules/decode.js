

const decodeString = (val) => {
    console.log(val.toString('utf8'))
    const messageParts = val.toString('utf8').split(',');
    const dataHex = messageParts[4].trim();
    const horaHex = messageParts[5].trim();
  
    let ch = dataHex.split('');
    let ano = `${ch[0]}${ch[1]}`;
    let mes = `${ch[2]}${ch[3]}`;
    let dia = `${ch[4]}${ch[5]}`;
    let a1 = parseInt(ano, 16);
    let m1 = parseInt(mes, 16);
    let d1 = parseInt(dia, 16);
    ch = horaHex.split('');
    let hora = `${ch[0]}${ch[1]}`;
    let minuto = `${ch[2]}${ch[3]}`;
    let segundo = `${ch[4]}${ch[5]}`;
    let h1 = parseInt(hora, 16);
    let min = parseInt(minuto, 16);
    let s1 = parseInt(segundo, 16);
  
  
    const latitudeHex = messageParts[6].trim();
    const longitudeHex = messageParts[7].trim();
  
    let latitudeDecimal = 0;
    let latitude = 0;
    let longitudeDecimal = 0;
    let longitude = 0;
  
    if (latitudeHex[0] === '8') {
      latitudeDecimal = parseInt(latitudeHex.substring(1), 16);
      latitude = (latitudeDecimal / 600000.0) * -1.0;
    } else {
      latitudeDecimal = parseInt(latitudeHex, 16);
      latitude = latitudeDecimal / 600000.0;
    }
  
    if (longitudeHex[0] === '8') {
      longitudeDecimal = parseInt(longitudeHex.substring(1), 16);
      longitude = (longitudeDecimal / 600000.0) * -1.0;
    } else {
      longitudeDecimal = parseInt(longitudeHex, 16);
      longitude = longitudeDecimal / 600000.0;
    }
  
    const velocidade = messageParts[8].trim();
    const vel = parseInt(velocidade, 16);
    const velo = vel / 100;
    const datetime = new Date(Date.UTC(a1, m1 - 1, d1, h1 - 3, min, s1, 768)).toISOString();    
  
    let objReturn = {
      imei: messageParts[1].trim(),
      latLng: {
        lat: latitude,
        lng: longitude,
      },
      createdAt: datetime,
      velocidade: velo,
      sinal: messageParts[11].trim(),
      // altitude: messageParts[15].trim(),
      // satelites: messageParts[16].trim(),
    }
    return objReturn
  }


  module.exports = { decodeString };