const getController = (data) => {
    return {
        check(user) {
            user.checkBody('username', 'Name is required').notEmpty();
            user.checkBody('password', 'Password is required').notEmpty();

            const errors = user.validationErrors();

            return errors;
        },
    };
};

module.exports = { getController };
