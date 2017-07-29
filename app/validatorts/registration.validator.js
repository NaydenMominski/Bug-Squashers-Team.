const isValid = (user) => {
            user.checkBody({
                'username': {
                    notEmpty: true,
                    matches: {
                        options: [/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/],
                    },
                    errorMessage: 'Invalid Username',
                },
                'password': {
                    notEmpty: true,
                    matches: {
                        options: [/^[0-9a-zA-Z]{5,30}$/],
                    },
                    errorMessage: 'Invalid Password',
                },
            });

            user.checkBody('password2', 'Passwords are not the same')
                .equals(user.body.password);

            const errors = user.validationErrors();

            return errors;
};

module.exports = { isValid };
