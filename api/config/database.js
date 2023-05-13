const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://23.22.63.175:27017/'+process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected')
    ).catch(err => console.log(err));
};

module.exports = connectDB;