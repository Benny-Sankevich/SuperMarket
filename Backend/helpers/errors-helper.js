//Change Error if environment is production
function getError(err) {
    if (process.env.NODE_ENV === "production") {
        return "Some error occurred, please try again.";
    }
    return err.message;
}

module.exports = {
    getError
};