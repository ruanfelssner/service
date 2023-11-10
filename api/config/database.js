const mongoose = require('mongoose');

const connectDB = async () => {
  const dbHost = process.env.NODE_ENV === 'development' ? 'db' : 'localhost';
  const dbPort = process.env.NODE_ENV === 'development' ? '27017' : '27017';

  const dbName = process.env.DB_NAME;

  const dbURL = `mongodb://${dbHost}:${dbPort}/${dbName}`;
  await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected')
    ).catch(err => console.log(err));
};

module.exports = connectDB;