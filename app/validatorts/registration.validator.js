const getController = (data) => {
    return {
        check(user) {
            user.checkBody({
                'username': {
                    notEmpty: true,
                    matches: {
                        options: [/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/],
                    },
                    errorMessage: 'Invalid Username', // Error message for the parameter
                },
                'password': {
                    notEmpty: true,
                    matches: {
                        options: [/^[0-9a-zA-Z]{5,30}$/],
                    },
                    errorMessage: 'Invalid Password', // Error message for the parameter
                },
            });

            user.checkBody('password2', 'Passwords are not the same').equals(user.body.password);

            const errors = user.validationErrors();

            return errors;
        },
    };
};

module.exports = { getController };
