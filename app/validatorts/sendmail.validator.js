const isValidMail = (mail) => {
            mail.checkBody({
                'fullname': {
                    matches: {
                        options: [/^[a-zA-z ,.'-]+$/i],
                    },
                    errorMessage: 'Invalid name',
                },
                'phone': {
                    matches: {
                        options: [/^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/],
                    },
                    errorMessage: 'Invalid phone',
                },
                'email': {
                    matches: {
                        options: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
                    },
                    errorMessage: 'Invalid email',
                },
                'subject': {
                    matches: {
                        options: [/^[a-zA-z ,.'-]+$/],
                    },
                    errorMessage: 'Invalid subject',
                },
                'message': {
                    matches: {
                        options: [/^[A-Za-z\d\s.!,()@?]{3,700}$/],
                    },
                    errorMessage: 'Invalid message',
                },
            });

            const errors = mail.validationErrors();

            return errors;
};

module.exports = { isValidMail };

