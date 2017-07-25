const isValid = (model) => {
    const registrationResponse = {};

    if (model.username === '') {
        registrationResponse.error = true;
        registrationResponse.message = 'username cant be empty';
    }
};

module.exports = { isValid };
