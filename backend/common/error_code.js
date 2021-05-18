module.exports = {
    error_unknown: {
        code: -1,
        message: "Unknown error"
    },
    error_success: {
        code: 0,
        message: "Success"
    },
    error_access: {
        code: 1,
        message: "Not authenticated"
    },
    error_form: {
        code: 2,
        message: "Wrong Form Content"
    },
    error_io: {
        code: 3,
        message: "IO error occurred"
    },
    error_location: {
        code: 4,
        message: "Location needed"
    },
    error_record: {
        code: 5,
        message: "No such record"
    },
    error_same_person: {
        code: 6,
        message: "Bike owner and leander are the same"
    },
    error_rented: {
        code: 7,
        message: "Bike has been rented out"
    },
    error_returned: {
        code: 8,
        message: "Bike has been returned"
    },
};