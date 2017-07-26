const isValid = (model) => {
    const registrationResponse = {};

    if (model.username === '') {
        registrationResponse.error = true;
        registrationResponse.message = 'username cant be empty';
    } else if (model.email === '') {
        registrationResponse.error = true;
        registrationResponse.message = 'email cant be empty';
    } else if (model.hashedPass === '') {
        registrationResponse.error = true;
        registrationResponse.message = 'password cant be empty';
    }
    return registrationResponse;
};

module.exports = { isValid };
