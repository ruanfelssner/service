

const ErrorsGoogleLogin = (value) => {
    let error = JSON.parse(value)
    console.log(error)
    if(error.includes("Token used too late,")){
        return "Token expirado"
    }
    return null
};

module.exports = { ErrorsGoogleLogin }