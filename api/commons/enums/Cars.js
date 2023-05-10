const CarsEnum = {
    CAR: "CAR",
    TRUCK: "TRUCK",
    BUS: "BUS",
    BIKE: "BIKE",
    values: () => {
      return Object.keys(CarsEnum).filter((v) => v !== "values");
    },
  };
  
  module.exports = { CarsEnum };
  