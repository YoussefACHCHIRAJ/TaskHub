class HandleErrors {
    errors = {};
    static loginErrors(error) {
        const handleErrors = new HandleErrors();
        Object.keys(error).forEach(err => {
            handleErrors.errors[err] = error[err].message;
        });
        return handleErrors.errors;
    }

    static tasksErrors(error) {
        console.log('error before construct: ', error);
        const handleErrors = new HandleErrors();
        Object.keys(error).forEach(err => {
            handleErrors.errors[err] = error[err].message;
        });
        return handleErrors.errors;
    }

    static createMemberErrors(error) {
        const handleErrors = new HandleErrors();
        error && Object.keys(error).forEach(err => {
            handleErrors.errors[err] = error[err].message;
        });
        return handleErrors.errors;

    }

    static getErrors(error) {
        return Object.keys(error);
    }
}

module.exports = HandleErrors;