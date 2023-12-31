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
        const handleErrors = new HandleErrors();
        Object.keys(error).forEach(err => {
            handleErrors.errors[err] = error[err].message;
        });
        return handleErrors.errors;
    }

    static createMemberErrors(error) {
        const handleErrors = new HandleErrors();
        if (error.message && error.message.includes('email_1 dup key')) {
            error = {
                errors: {
                    email: {
                        message: 'The email you provided is already used.'
                    }
                }
            }
        }
        error.errors && Object.keys(error.errors).forEach(err => {
            handleErrors.errors[err] = error.errors[err].message;
        });
        return handleErrors.errors;

    }

    static storeTeamError(error){
        const handleErrors = new HandleErrors();
        Object.keys(error).forEach(err => {
            handleErrors.errors[err] = error[err].message;
        });

        return handleErrors.errors;
    }
}

module.exports = HandleErrors;