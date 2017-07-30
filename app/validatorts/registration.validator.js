const isValid = (user) => {
    user.checkBody({
            'username': {
                notEmpty: true,
                matches: {
                    options: [
                        /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/,
                    ],
                },
                errorMessage: 'Invalid username',
            },
            'password': {
                notEmpty: true,
                matches: {
                    options: [/^[0-9a-zA-Z]{5,30}$/],
                },
                errorMessage: 'Invalid password',
            },
            'agency': {
                matches: {
                    options: [/((^$)|^[a-zA-Z -[\]{}()*+?.,\\^$|#\s]{5,120}$)/],
                },
                errorMessage: 'Invalid agency name',
            },
            'firstname': {
                matches: {
                    options: [
                        /((^$)|^[a-z A-Z,.'-]+$)/,
                    ],
                },
                errorMessage: 'Invalid first name',
            },
            'lastname': {
                matches: {
                    options: [
                        /((^$)|^[a-z A-Z,.'-]+$)/,
                    ],
                },
                errorMessage: 'Invalid last name',
            },
            'email': {
                matches: {
                    options: [
                        /((^$)|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                    ],
                },
                errorMessage: 'Invalid email adress',
            },
            'phone': {
                matches: {
                    options: [
                        /((^$)|^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$)/,
                    ],
                },
                errorMessage: 'Invalid phone',
            },
            'website': {
                matches: {
                    options: [
                        /((^$)|^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$)/,
                    ],
                },
                errorMessage: 'Invalid website',
            },
        });

user.checkBody('password2', 'Passwords are not the same')
    .equals(user.body.password);

const errors = user.validationErrors();

return errors;
};

module.exports = { isValid };
