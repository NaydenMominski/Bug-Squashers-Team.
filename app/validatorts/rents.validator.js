const isValid = (rent) => {
            rent.checkBody({
                'headline': {
                    matches: {
                    notEmpty: false,
                        options: [/((^$)|^[a-zA-Z -[\]{}()*+?.,\\^$|#\s]{0,120}$)/],
                    },
                    errorMessage: 'Invalid headline',
                },
                'price': {
                    matches: {
                        options: [/^[0-9]+(\.[0-9][0-9]?)?$/],
                    },
                    errorMessage: 'Invalid price',
                },
                'size': {
                    matches: {
                        options: [/^[0-9]+(\.[0-9][0-9]?)?$/],
                    },
                    errorMessage: 'Invalid size',
                },
                'floor': {
                    matches: {
                        options: [/^[0-9]+$/],
                    },
                    errorMessage: 'Invalid floor',
                },
                'buildingfloors': {
                    matches: {
                        options: [/^[0-9]+$/],
                    },
                    errorMessage: 'Invalid floors in building',
                },
            });

            rent.checkBody('property', 'Please select property').notEmpty();
            rent.checkBody('location', 'Please select province').notEmpty();
            rent.checkBody('bedrooms', 'Please select bedrooms').notEmpty();
            rent.checkBody('bathrooms', 'Please select bathrooms').notEmpty();

            const errors = rent.validationErrors();

            return errors;
};

module.exports = { isValid };

