const Permissions = {
    ADMIN: "ADMIN",
    USER: "USER",
    CLIENT: "CLIENT",
    values: () => {
      return Object.keys(Permissions).filter((v) => v !== "values");
    },
  };
  
  module.exports = { Permissions };
  