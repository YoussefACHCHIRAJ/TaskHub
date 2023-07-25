class handleErrors {
    errors = {};
    static loginErrors(error){
        if(error.includes('email')){
            return 'Email incorrect.';
        }
        if(error.includes('password')){
            return 'password incorrect.';
        }
        return 'incorrect data';
    }

    static tasksErrors(error) {
        const handleTaskErrors = new handleErrors()
        if(error.includes("title")){
            handleTaskErrors.errors.title =  "Provide a valid title";
        }
        if(error.includes("description")){
            handleTaskErrors.errors.description = "Provide a valid description";
        }
        if(error.includes("dateStart")){
            handleTaskErrors.errors.start = "Provide a valid date start";
        }
        if(error.includes("deadline")){
            handleTaskErrors.errors.due = "Provide a valid deadline";
        }
        return handleTaskErrors.errors;
    }
}

module.exports = handleErrors;