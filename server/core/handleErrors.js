class HandleErrors {
    errors = {};
    static loginErrors(error) {
        if (error.includes('email')) {
            return 'Email incorrect.';
        }
        if (error.includes('password')) {
            return 'password incorrect.';
        }
        return error;
    }

    static tasksErrors(error) {
        const handleTaskErrors = new HandleErrors()
        if (error.includes("title")) {
            handleTaskErrors.errors.title = "Provide a valid title";
        }
        if (error.includes("description")) {
            handleTaskErrors.errors.description = "Provide a valid description";
        }
        if (error.includes("dateStart")) {
            handleTaskErrors.errors.start = "Provide a valid date start";
        }
        if (error.includes("deadline")) {
            handleTaskErrors.errors.due = "Provide a valid deadline";
        }
        return handleTaskErrors.errors;
    }

    static createMemberErrors(error) {
        const handletCreateMemberErrors = new HandleErrors();
        if (error.includes('name')) {
            handletCreateMemberErrors.errors.name = "Pleaze provide a valid name"
        }
        if (error.includes('email_1 dup key')) {
            handletCreateMemberErrors.errors.email = "This email alrady exist"
        } else if (error.includes('email')) {
            handletCreateMemberErrors.errors.email = "Pleaze provide a valid email"
        }
        if (error.includes('password')) {
            handletCreateMemberErrors.errors.password = "Pleaze provide a valid password"
        }
        return handletCreateMemberErrors;
    }
}

module.exports = HandleErrors;