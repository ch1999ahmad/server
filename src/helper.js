

const successFalse = (message, result) => {
    return {
        success: false,
        message: message,
        result
    }
}
const successTrue = (message, error) => {
    return {
        success: true,
        message: message,
        result: error
    }
}

module.exports = { successTrue, successFalse }